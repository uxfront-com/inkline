import vue from "@uxfront/oxlint-config/vue";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [vue],
  // oxlint reads `env` and `ignorePatterns` from the root config only, so they're restated here.
  env: vue.env,
  // This list is also what `check-types` (CI's Type Check job) honours: `oxlint -A all` turns every
  // lint rule off but still type-checks, and it reads `ignorePatterns` to choose the file set.
  // Anything ignored here is invisible to the gate, so keep the entries file-scoped.
  ignorePatterns: [...vue.ignorePatterns, ".context/**", ".old/**", "ui/**/.styleframe/**"],
  options: { typeAware: true, typeCheck: true },
  rules: {
    // It flags each explicit `Record<string, T>` and written-out return type. Inkline's records are
    // lookup tables read by any string key (characters to escape, labels, bundles by entry), and
    // functions state the type they return as the contract they keep.
    "quality/no-known-value-widening": "off",
    // Each assertion stands for a check the types can't see: a handler's `currentTarget` is the
    // element the handler is bound to, a test's queried element is the one it rendered, and Nuxt
    // Content's untyped pages and Node's errors are asserted once to the fields the code reads.
    "typescript/no-unsafe-type-assertion": "off",
  },
  overrides: [
    {
      // A component's source keeps the form its author wrote, since Unframework compiles it to seven
      // outputs that follow it, and the docs pages quote the examples as they are. So a style rule
      // doesn't rewrite them, as in Unframework's own config.
      files: ["ui/components/src/components/**"],
      rules: {
        // The compiler must keep lowering the braceless `if` that authors write.
        curly: "off",
        // Prop types reach every output as written, and `T[]` is the form most authors use.
        "typescript/array-type": "off",
      },
    },
    {
      // Command-line scripts: what they print to the console is their output.
      files: ["apps/docs/scripts/**", "ui/components/scripts/**"],
      rules: {
        "no-console": "off",
      },
    },
    {
      // When Git can't date the pages, the sitemap's build says so in its log and carries on.
      files: ["apps/docs/server/lib/git.ts"],
      rules: {
        "no-console": "off",
      },
    },
    {
      // The page head's `<meta charset>` takes HTML's spelling, "utf-8", not Node's encoding name.
      files: ["apps/docs/nuxt.config.ts"],
      rules: {
        "unicorn/text-encoding-identifier-case": "off",
      },
    },
    {
      // Each `!` reads a value that can't be missing: the page's `validate` has already checked the
      // framework in the URL, and the escape pattern matches only the characters it has entities for.
      files: ["apps/docs/app/pages/*framework*.vue", "apps/docs/server/routes/sitemap.xml.ts"],
      rules: {
        "typescript/no-non-null-assertion": "off",
      },
    },
    {
      // The API report reads `package.json` and the built Vue modules, which have no types, and
      // checks each field before it relies on it. Its TypeScript program and its readers are set up
      // before they're read, and the helpers sit beside the one function that uses them.
      files: ["ui/components/scripts/api-report.ts"],
      rules: {
        "typescript/no-unsafe-assignment": "off",
        "typescript/no-unsafe-member-access": "off",
        "typescript/no-unsafe-return": "off",
        "typescript/no-non-null-assertion": "off",
        "unicorn/consistent-function-scoping": "off",
      },
    },
    {
      // The recipe loader reads the globals the Styleframe runtime sets, whose shape isn't typed.
      files: ["ui/components/scripts/recipes.ts"],
      rules: {
        "quality/no-unsafe-dictionary-type": "off",
      },
    },
    {
      // Tests read what a module or a framework sets with no type to read it through, keep their
      // helpers beside the tests that use them, filter and map lists of a few items for clarity, and
      // wait a tick with `new Promise((resolve) => setTimeout(resolve))`.
      files: ["**/*.test.ts"],
      rules: {
        "quality/no-unsafe-dictionary-type": "off",
        "unicorn/consistent-function-scoping": "off",
        "quality/no-array-filter-map": "off",
        "no-promise-executor-return": "off",
      },
    },
  ],
});
