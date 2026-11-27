/**
 * The API report of a framework package: what a consumer of `@inkline/<framework>` can import and
 * write. It's committed as `ui/<framework>/test/api.json`, so an API change shows up as a diff of
 * that file. `pnpm --filter @inkline/components run api:check` builds the report of each of the seven
 * packages and compares it with the committed file. When one differs, it prints the lines that differ
 * and exits with 1. CI runs it once, in the API Report job, and `pnpm run ready` runs it too.
 * `pnpm --filter @inkline/components run api:update` writes the reports again. Both need a build.
 *
 * It reads two things:
 *
 * - **The built entries** (`dist/`, through the package's `exports`), for the names `.` and
 *   `./headless` export.
 * - **The emitted sources** of each exported component, for its props, models and events, and on
 *   Angular its selector. React, Solid, Qwik, Svelte and Astro read the type of the props the
 *   component declares, through TypeScript's checker. Vue reads the `props` and `emits` of the built
 *   component, and Angular the `input()`, `model()` and `output()` members of its class.
 *
 * A member that only a framework's own types declare, like React's `HTMLAttributes`, is an attribute,
 * not a prop: the report says only whether the component takes attributes.
 *
 * The command line is `node scripts/api-report.ts <check|update> [<framework>...]`, from
 * `ui/components`. With no framework named, it handles all seven.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { diff } from "node:util";

import ts from "@typescript/typescript6";

export const FRAMEWORKS = ["react", "vue", "svelte", "solid", "angular", "qwik", "astro"] as const;
export type Framework = (typeof FRAMEWORKS)[number];

/** One exported component's API. */
export interface ComponentApi {
	/** Angular only: the selectors the component matches. */
	selectors?: Array<string>;
	/** The props a consumer sets, models and events excluded. */
	props: Array<string>;
	/** The two-way props: `v-model`, `bind:`, a prop with its update callback, or an Angular `model()`. */
	models: Array<string>;
	/** The events a consumer listens to, as the consumer writes them. */
	events: Array<string>;
	/** Whether the component also takes attributes beyond its props, like `class` or `aria-*`. */
	attributes: boolean;
}

export interface ApiReport {
	/** The names each entry exports, sorted. */
	entries: Record<"." | "./headless", Array<string>>;
	/** Each exported component, by its exported name. */
	components: Record<string, ComponentApi>;
}

const UI = resolve(import.meta.dirname, "../..");

/** The report of `@inkline/<framework>`, from its build and the emitted sources in `emittedDir`. */
export async function buildApiReport(framework: Framework, emittedDir: string): Promise<ApiReport> {
	const packageDir = join(UI, framework);
	const entries = {
		".": exportNames(entryFile(packageDir, ".")),
		"./headless": exportNames(entryFile(packageDir, "./headless")),
	};
	const names = [...new Set([...entries["."], ...entries["./headless"]])].sort();
	const sources = barrelSources(emittedDir);
	const components: Record<string, ComponentApi> = {};
	const reader = framework === "vue" ? undefined : new SourceReader(framework, packageDir);
	for (const name of names) {
		const source = sources.get(name);
		if (!source) {
			throw new Error(`${framework}: no emitted source exports ${name} in ${emittedDir}`);
		}
		components[name] =
			framework === "vue"
				? await vueComponentApi(packageDir, name)
				: framework === "angular"
					? angularComponentApi(source.file, source.local)
					: reader!.componentApi(source.file, source.local);
	}
	return { entries, components };
}

/** The report as the committed file holds it: one name to a line, so each changed line is a change. */
export function formatApiReport(report: ApiReport): string {
	return `${JSON.stringify(report, null, 2)}\n`;
}

// ---------------------------------------------------------------------------------------------------
// Built entries

function entryFile(packageDir: string, subpath: "." | "./headless"): string {
	const manifest = JSON.parse(readFileSync(join(packageDir, "package.json"), "utf8"));
	let target = manifest.exports?.[subpath];
	while (target && typeof target === "object") {
		target = target.import ?? target.default;
	}
	if (typeof target !== "string") {
		throw new Error(`${packageDir}: no "${subpath}" export`);
	}
	const file = join(packageDir, target);
	if (!existsSync(file)) {
		throw new Error(`${file} doesn't exist: build the package first`);
	}
	return file;
}

/** The names an ES module exports, read from its export declarations. */
function exportNames(file: string): Array<string> {
	const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest);
	const names: Array<string> = [];
	for (const statement of source.statements) {
		if (ts.isExportDeclaration(statement) && statement.exportClause) {
			if (ts.isNamedExports(statement.exportClause)) {
				for (const element of statement.exportClause.elements) {
					names.push(element.name.text);
				}
			}
		} else if (ts.isExportDeclaration(statement)) {
			throw new Error(`${file}: \`export *\` can't be read from the built entry`);
		} else if (hasExportModifier(statement)) {
			if (ts.isVariableStatement(statement)) {
				for (const declaration of statement.declarationList.declarations) {
					if (ts.isIdentifier(declaration.name)) {
						names.push(declaration.name.text);
					}
				}
			} else if (
				(ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) &&
				statement.name
			) {
				names.push(statement.name.text);
			}
		}
	}
	return names.sort();
}

function hasExportModifier(node: ts.Node): boolean {
	return (
		ts.canHaveModifiers(node) &&
		(ts.getModifiers(node) ?? []).some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
	);
}

// ---------------------------------------------------------------------------------------------------
// Emitted sources

interface Source {
	/** The emitted file that declares the component. */
	file: string;
	/** The component's name in that file: `default`, or the local name of a named export. */
	local: string;
}

/** Each name the emitted barrels export, with the file and the local name it comes from. */
function barrelSources(emittedDir: string): Map<string, Source> {
	const sources = new Map<string, Source>();
	for (const barrel of ["index.ts", "headless.ts"]) {
		const file = join(emittedDir, barrel);
		if (!existsSync(file)) {
			throw new Error(`${file} doesn't exist: compile the components first`);
		}
		const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest);
		for (const statement of source.statements) {
			if (
				!ts.isExportDeclaration(statement) ||
				!statement.moduleSpecifier ||
				!ts.isStringLiteral(statement.moduleSpecifier) ||
				!statement.exportClause ||
				!ts.isNamedExports(statement.exportClause)
			) {
				continue;
			}
			const target = resolveEmitted(join(emittedDir, statement.moduleSpecifier.text));
			for (const element of statement.exportClause.elements) {
				sources.set(element.name.text, {
					file: target,
					local: (element.propertyName ?? element.name).text,
				});
			}
		}
	}
	return sources;
}

/** An emitted module's file, for a specifier written with or without its extension. */
function resolveEmitted(path: string): string {
	for (const candidate of [
		path,
		`${path}.tsx`,
		`${path}.ts`,
		`${path}.svelte`,
		`${path}.vue`,
		`${path}.astro`,
	]) {
		if (existsSync(candidate)) {
			return candidate;
		}
	}
	throw new Error(`${path}: no emitted file`);
}

// ---------------------------------------------------------------------------------------------------
// TypeScript-typed targets: React, Solid, Qwik, Svelte and Astro

/** The script of a single-file component, as a TypeScript module the checker can read. */
function componentScript(file: string): string | undefined {
	const text = readFileSync(file, "utf8");
	if (file.endsWith(".astro")) {
		const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
		return match ? match[1] : "";
	}
	if (file.endsWith(".svelte") || file.endsWith(".vue")) {
		return [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
			.map((match) => match[1])
			.join("\n");
	}
	return undefined;
}

const COMPONENT_EXTENSIONS = /\.(astro|svelte|vue)$/;

class SourceReader {
	private program: ts.Program | undefined;
	private readonly roots = new Set<string>();

	private readonly framework: Framework;
	private readonly packageDir: string;

	constructor(framework: Framework, packageDir: string) {
		this.framework = framework;
		this.packageDir = packageDir;
	}

	componentApi(file: string, local: string): ComponentApi {
		const checker = this.checkerFor(file);
		const source = this.program!.getSourceFile(this.scriptPath(file))!;
		const node = this.propsNode(source, local);
		const props = new Set<string>();
		const events = new Set<string>();
		const models = new Set<string>();
		const frameworkMembers = new Set<string>();
		let isIndexed = (_name: string) => false;
		let attributes = false;
		if (node) {
			const type = checker.getTypeAtLocation(node);
			const indexes = checker.getIndexInfosOfType(type);
			if (indexes.length > 0) {
				attributes = true;
			}
			// A name an index signature takes, like Astro's `data-${string}`, is an attribute too.
			isIndexed = (name) =>
				indexes.some((index) =>
					checker.isTypeAssignableTo(checker.getStringLiteralType(name), index.keyType),
				);
			for (const property of checker.getPropertiesOfType(type)) {
				if (isFrameworkMember(property)) {
					attributes = true;
					frameworkMembers.add(property.getName());
					continue;
				}
				const name = property.getName();
				if (/^on[A-Z]/.test(name) || this.isSvelteListener(name, property, node, checker)) {
					events.add(name);
				} else {
					props.add(name);
				}
			}
			if (this.framework === "svelte") {
				for (const name of svelteBindables(node)) {
					models.add(name);
				}
			}
		}
		if (this.framework === "astro") {
			// A prop the frontmatter reads without declaring it, like a model's value. An attribute it
			// reads to merge with its root's own, like `aria-label`, is still an attribute.
			for (const name of astroPropReads(source)) {
				if (!events.has(name) && !frameworkMembers.has(name) && !isIndexed(name)) {
					props.add(name);
				}
			}
		}
		// A prop whose update callback the component takes is a model: `checked` with `onUpdateChecked`,
		// `onCheckedChange` or, on Qwik, `onCheckedChange$`.
		for (const event of events) {
			const name = /^onUpdate(\w+?)\$?$/.exec(event)?.[1] ?? /^on(\w+?)Change\$?$/.exec(event)?.[1];
			const model = name && name.charAt(0).toLowerCase() + name.slice(1);
			if (model && props.has(model)) {
				models.add(model);
			}
		}
		for (const model of models) {
			props.delete(model);
		}
		return {
			props: [...props].sort(),
			models: [...models].sort(),
			events: [...events].sort(),
			attributes,
		};
	}

	/**
	 * Svelte 5 takes a listener as a callback prop named with the event's lower-case name, like
	 * `onclick`, where the other targets write `onClick`.
	 */
	private isSvelteListener(
		name: string,
		property: ts.Symbol,
		node: ts.Node,
		checker: ts.TypeChecker,
	): boolean {
		if (this.framework !== "svelte" || !/^on[a-z]/.test(name)) {
			return false;
		}
		const type = checker.getNonNullableType(checker.getTypeOfSymbolAtLocation(property, node));
		return type.getCallSignatures().length > 0;
	}

	/** The node whose type is the component's props. */
	private propsNode(source: ts.SourceFile, local: string): ts.Node | undefined {
		if (this.framework === "svelte") {
			let found: ts.Node | undefined;
			source.forEachChild(function visit(node) {
				if (
					ts.isVariableDeclaration(node) &&
					node.initializer &&
					ts.isCallExpression(node.initializer) &&
					node.initializer.expression.getText(source) === "$props"
				) {
					found = node.type ?? node.name;
				}
				if (!found) {
					node.forEachChild(visit);
				}
			});
			return found;
		}
		if (this.framework === "astro") {
			for (const statement of source.statements) {
				if (
					(ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement)) &&
					statement.name.text === "Props"
				) {
					return statement.name;
				}
			}
			return undefined;
		}
		const component = this.componentNode(source, local);
		if (!component) {
			throw new Error(`${source.fileName}: no component \`${local}\``);
		}
		const parameter = component.parameters[0];
		return parameter ? (parameter.type ?? parameter.name) : undefined;
	}

	/** The function that is the component: React and Solid declare it, and Qwik passes it to `component$`. */
	private componentNode(source: ts.SourceFile, local: string): ts.SignatureDeclaration | undefined {
		const unwrap = (expression: ts.Expression | undefined): ts.SignatureDeclaration | undefined => {
			while (
				expression &&
				(ts.isParenthesizedExpression(expression) || ts.isAsExpression(expression))
			) {
				expression = expression.expression;
			}
			if (!expression) {
				return undefined;
			}
			if (ts.isArrowFunction(expression) || ts.isFunctionExpression(expression)) {
				return expression;
			}
			if (ts.isCallExpression(expression)) {
				return unwrap(expression.arguments[0]);
			}
			if (ts.isIdentifier(expression)) {
				return find(expression.text);
			}
			return undefined;
		};
		const find = (name: string): ts.SignatureDeclaration | undefined => {
			for (const statement of source.statements) {
				if (ts.isFunctionDeclaration(statement)) {
					const isDefault = (ts.getModifiers(statement) ?? []).some(
						(m) => m.kind === ts.SyntaxKind.DefaultKeyword,
					);
					if (statement.name?.text === name || (name === "default" && isDefault)) {
						return statement;
					}
				} else if (ts.isVariableStatement(statement)) {
					for (const declaration of statement.declarationList.declarations) {
						if (ts.isIdentifier(declaration.name) && declaration.name.text === name) {
							return unwrap(declaration.initializer);
						}
					}
				} else if (ts.isExportAssignment(statement) && name === "default") {
					return unwrap(statement.expression);
				}
			}
			return undefined;
		};
		return find(local);
	}

	/** A checker over every emitted file the report reads, built once for the first. */
	private checkerFor(file: string): ts.TypeChecker {
		if (!this.program || !this.roots.has(this.scriptPath(file))) {
			const dir = dirname(file);
			// Every emitted file under the same tree, so one program serves every component.
			const root = this.emittedRoot(dir);
			for (const path of ts.sys.readDirectory(
				root,
				[".tsx", ".ts", ".svelte", ".astro"],
				["**/node_modules/**"],
			)) {
				this.roots.add(this.scriptPath(path));
			}
			this.program = this.createProgram([...this.roots]);
		}
		return this.program.getTypeChecker();
	}

	private emittedRoot(dir: string): string {
		let current = dir;
		while (!existsSync(join(current, "index.ts")) && dirname(current) !== current) {
			current = dirname(current);
		}
		return current;
	}

	/** The path the checker reads a component file at: `X.astro` is read as the module `X.astro.ts`. */
	private scriptPath(file: string): string {
		return COMPONENT_EXTENSIONS.test(file) ? `${file}.ts` : file;
	}

	private createProgram(roots: Array<string>): ts.Program {
		const options: ts.CompilerOptions = {
			target: ts.ScriptTarget.ESNext,
			module: ts.ModuleKind.ESNext,
			moduleResolution: ts.ModuleResolutionKind.Bundler,
			jsx: ts.JsxEmit.Preserve,
			allowImportingTsExtensions: true,
			allowArbitraryExtensions: true,
			allowUmdGlobalAccess: true,
			allowJs: false,
			noEmit: true,
			skipLibCheck: true,
			strict: true,
			types: [],
		};
		const host = ts.createCompilerHost(options, true);
		const styleframeTypes = join(this.packageDir, ".styleframe/styleframe.d.ts");
		const scripts = new Map<string, string>();
		const scriptOf = (path: string): string | undefined => {
			if (!path.endsWith(".ts")) {
				return undefined;
			}
			const original = path.slice(0, -3);
			if (!COMPONENT_EXTENSIONS.test(original) || !existsSync(original)) {
				return undefined;
			}
			if (!scripts.has(path)) {
				scripts.set(path, componentScript(original) ?? "");
			}
			return scripts.get(path);
		};
		const fileExists = host.fileExists.bind(host);
		const readFile = host.readFile.bind(host);
		const getSourceFile = host.getSourceFile.bind(host);
		host.fileExists = (path) => scriptOf(path) !== undefined || fileExists(path);
		host.readFile = (path) => scriptOf(path) ?? readFile(path);
		host.getSourceFile = (path, language, onError, shouldCreate) => {
			const script = scriptOf(path);
			return script !== undefined
				? ts.createSourceFile(path, script, language, true, ts.ScriptKind.TS)
				: getSourceFile(path, language, onError, shouldCreate);
		};
		host.resolveModuleNameLiterals = (literals, containingFile) =>
			literals.map(({ text }) => {
				if (text === "virtual:styleframe" && existsSync(styleframeTypes)) {
					return {
						resolvedModule: { resolvedFileName: styleframeTypes, extension: ts.Extension.Dts },
					};
				}
				if (COMPONENT_EXTENSIONS.test(text) && text.startsWith(".")) {
					const resolvedFileName = `${resolve(dirname(containingFile), text)}.ts`;
					return { resolvedModule: { resolvedFileName, extension: ts.Extension.Ts } };
				}
				return ts.resolveModuleName(text, containingFile, options, host);
			});
		return ts.createProgram({ rootNames: roots, options, host });
	}
}

/** Whether a declaration comes from a framework's or the platform's own types, not the component's. */
function isFrameworkFile(fileName: string): boolean {
	return fileName.includes("/node_modules/");
}

/**
 * Whether only a framework's own types declare a member, so it's an attribute. A member of a mapped
 * type over template-literal keys, like Qwik's `window:onScroll$` or `stoppropagation:click`, has no
 * declaration of its own, so the mapped type's declaration tells.
 */
function isFrameworkMember(property: ts.Symbol): boolean {
	const declarations = property.getDeclarations() ?? [];
	if (declarations.length > 0) {
		return declarations.every((d) => isFrameworkFile(d.getSourceFile().fileName));
	}
	const mapped = (property as { links?: { mappedType?: ts.Type } }).links?.mappedType;
	const origin = mapped?.aliasSymbol ?? mapped?.symbol;
	return (origin?.getDeclarations() ?? []).some((d) => isFrameworkFile(d.getSourceFile().fileName));
}

/** The props a Svelte component destructures as `$bindable()`. */
function svelteBindables(node: ts.Node): Array<string> {
	const declaration = node.parent;
	if (!ts.isVariableDeclaration(declaration) || !ts.isObjectBindingPattern(declaration.name)) {
		return [];
	}
	return declaration.name.elements
		.filter((element) => element.initializer && /^\$bindable\b/.test(element.initializer.getText()))
		.map((element) => ((element.propertyName ?? element.name) as ts.Identifier).text);
}

/** The props an Astro frontmatter reads from `Astro.props`, directly or through a `props` binding. */
function astroPropReads(source: ts.SourceFile): Array<string> {
	const names = new Set<string>();
	const aliases = new Set(["Astro.props"]);
	source.forEachChild(function visit(node) {
		if (ts.isVariableDeclaration(node) && node.initializer) {
			let init: ts.Expression = node.initializer;
			while (ts.isAsExpression(init) || ts.isParenthesizedExpression(init)) {
				init = init.expression;
			}
			if (aliases.has(init.getText(source))) {
				if (ts.isIdentifier(node.name)) {
					aliases.add(node.name.text);
				} else if (ts.isObjectBindingPattern(node.name)) {
					for (const element of node.name.elements) {
						if (!element.dotDotDotToken) {
							names.add(((element.propertyName ?? element.name) as ts.Identifier).text);
						}
					}
				}
			}
		}
		if (ts.isPropertyAccessExpression(node) && aliases.has(node.expression.getText(source))) {
			names.add(node.name.text);
		}
		node.forEachChild(visit);
	});
	return [...names];
}

// ---------------------------------------------------------------------------------------------------
// Angular

/** An Angular component's selector, and its `input()`, `model()` and `output()` members. */
function angularComponentApi(file: string, local: string): ComponentApi {
	const source = ts.createSourceFile(
		file,
		readFileSync(file, "utf8"),
		ts.ScriptTarget.Latest,
		true,
	);
	const declaration = source.statements.find(
		(statement): statement is ts.ClassDeclaration =>
			ts.isClassDeclaration(statement) &&
			(statement.name?.text === local ||
				(local === "default" &&
					(ts.getModifiers(statement) ?? []).some((m) => m.kind === ts.SyntaxKind.DefaultKeyword))),
	);
	if (!declaration) {
		throw new Error(`${file}: no class \`${local}\``);
	}
	const selectors: Array<string> = [];
	for (const decorator of ts.getDecorators(declaration) ?? []) {
		const call = decorator.expression;
		if (!ts.isCallExpression(call) || call.expression.getText(source) !== "Component") {
			continue;
		}
		const metadata = call.arguments[0];
		if (!metadata || !ts.isObjectLiteralExpression(metadata)) {
			continue;
		}
		for (const property of metadata.properties) {
			if (ts.isPropertyAssignment(property) && property.name.getText(source) === "selector") {
				const value = property.initializer;
				if (ts.isStringLiteralLike(value)) {
					selectors.push(...value.text.split(",").map((s) => s.trim()));
				}
			}
		}
	}
	const props: Array<string> = [];
	const models: Array<string> = [];
	const events: Array<string> = [];
	for (const member of declaration.members) {
		if (!ts.isPropertyDeclaration(member) || !member.initializer || !ts.isIdentifier(member.name)) {
			continue;
		}
		const call: ts.Expression = member.initializer;
		if (!ts.isCallExpression(call)) {
			continue;
		}
		const callee = call.expression.getText(source);
		const kind = /^(input|model|output)(\.required)?$/.exec(callee)?.[1];
		if (!kind) {
			continue;
		}
		const options = call.arguments.find(ts.isObjectLiteralExpression);
		const alias = options?.properties.find(
			(property): property is ts.PropertyAssignment =>
				ts.isPropertyAssignment(property) && property.name.getText(source) === "alias",
		);
		const name =
			alias && ts.isStringLiteralLike(alias.initializer)
				? alias.initializer.text
				: member.name.text;
		(kind === "input" ? props : kind === "model" ? models : events).push(name);
	}
	return {
		selectors: selectors.sort(),
		props: props.sort(),
		models: models.sort(),
		events: events.sort(),
		// Angular components take attributes on their host element.
		attributes: true,
	};
}

// ---------------------------------------------------------------------------------------------------
// Vue

/** A Vue component's `props` and `emits`, read from the built package. */
async function vueComponentApi(packageDir: string, name: string): Promise<ComponentApi> {
	const modules = await Promise.all(
		([".", "./headless"] as const).map(
			(subpath) => import(pathToFileURL(entryFile(packageDir, subpath)).href),
		),
	);
	const component = modules.map((module) => module[name]).find(Boolean);
	if (!component) {
		throw new Error(`vue: the build exports no component ${name}`);
	}
	const keys = (value: unknown): Array<string> =>
		Array.isArray(value) ? value : value && typeof value === "object" ? Object.keys(value) : [];
	const emits = keys(component.emits);
	const models = emits
		.filter((event) => event.startsWith("update:"))
		.map((event) => event.slice("update:".length));
	const props = keys(component.props).filter(
		(prop) =>
			!models.includes(prop) &&
			!models.some(
				(model) =>
					prop === `${model}Modifiers` || (model === "modelValue" && prop === "modelModifiers"),
			),
	);
	return {
		props: props.sort(),
		models: models.sort(),
		events: emits.filter((event) => !event.startsWith("update:")).sort(),
		attributes: component.inheritAttrs !== false,
	};
}

// ---------------------------------------------------------------------------------------------------
// Check and update

/** The command that writes the reports again, which the check prints when one differs. */
export const UPDATE_COMMAND = "pnpm --filter @inkline/components run api:update";

/**
 * A line diff from the committed report to the built one: `- ` before a committed line the build
 * doesn't have, `+ ` before a line the build adds, and up to `context` unchanged lines around each
 * change, with `…` between changes that are further apart. Empty when the two are equal.
 */
export function diffReports(committed: string, built: string, context = 2): string {
	if (committed === built) {
		return "";
	}
	// `diff(actual, expected)` marks a line only `actual` has with 1, and one only `expected` has with -1.
	const operations = diff(lines(built), lines(committed));
	const visible = operations.map((_, index) =>
		operations
			.slice(Math.max(0, index - context), index + context + 1)
			.some(([operation]) => operation !== 0),
	);
	const out: Array<string> = [];
	let last = -1;
	for (let index = 0; index < operations.length;) {
		if (!visible[index]) {
			index++;
			continue;
		}
		if (last >= 0 && index > last + 1) {
			out.push("…");
		}
		const operation = operations[index];
		if (operation?.[0] === 0) {
			out.push(`  ${operation[1]}`);
			last = index++;
			continue;
		}
		// A run of changed lines: the committed ones first, then the ones the build has instead.
		let end = index;
		while (end < operations.length && operations[end]?.[0] !== 0) {
			end++;
		}
		const run = operations.slice(index, end);
		for (const [operation, line] of run) {
			if (operation === -1) {
				out.push(`- ${line}`);
			}
		}
		for (const [operation, line] of run) {
			if (operation === 1) {
				out.push(`+ ${line}`);
			}
		}
		last = end - 1;
		index = end;
	}
	if (out.length === 0) {
		out.push("(only the final newline differs)");
	}
	return `${out.join("\n")}\n`;
}

function lines(text: string): Array<string> {
	if (text === "") {
		return [];
	}
	return (text.endsWith("\n") ? text.slice(0, -1) : text).split("\n");
}

/** The committed report of `@inkline/<framework>`. */
export function reportFile(framework: Framework): string {
	return join(UI, framework, "test/api.json");
}

// ---------------------------------------------------------------------------------------------------
// Command line

if (process.argv[1] && resolve(process.argv[1]) === import.meta.filename) {
	const [mode, ...names] = process.argv.slice(2);
	const unknown = names.filter((name) => !FRAMEWORKS.includes(name as Framework));
	if ((mode !== "check" && mode !== "update") || unknown.length > 0) {
		console.error(`usage: node scripts/api-report.ts <check|update> [${FRAMEWORKS.join("|")}]...`);
		if (unknown.length > 0) {
			console.error(`unknown framework: ${unknown.join(", ")}`);
		}
		process.exit(2);
	}
	const frameworks = names.length > 0 ? (names as Array<Framework>) : FRAMEWORKS;
	let differ = 0;
	let broken = 0;
	for (const framework of frameworks) {
		const file = reportFile(framework);
		const shown = relative(join(UI, ".."), file);
		let built: string;
		try {
			built = formatApiReport(
				await buildApiReport(framework, join(UI, "components/dist", framework)),
			);
		} catch (error) {
			console.error(`✗ ${framework}: ${error instanceof Error ? error.message : String(error)}`);
			broken++;
			continue;
		}
		const committed = existsSync(file) ? readFileSync(file, "utf8") : "";
		const changes = diffReports(committed, built);
		if (mode === "update") {
			if (changes) {
				writeFileSync(file, built);
			}
			console.log(`${changes ? "updated" : "unchanged"} ${shown}`);
		} else if (changes) {
			console.error(`✗ ${framework}: the build's API differs from ${shown}`);
			process.stderr.write(changes);
			differ++;
		} else {
			console.log(`✓ ${framework} matches ${shown}`);
		}
	}
	if (broken > 0) {
		console.error(
			`\n${broken} of ${frameworks.length} API reports couldn't be built. Run \`pnpm run build\` first.`,
		);
	}
	if (differ > 0) {
		console.error(
			`\n${differ} of ${frameworks.length} API reports differ from the build. If the change is intended, run \`${UPDATE_COMMAND}\` and list each changed line in the package's changeset.`,
		);
	}
	if (broken > 0 || differ > 0) {
		process.exit(1);
	}
}
