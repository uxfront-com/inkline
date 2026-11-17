import { deepStrictEqual, throws } from "node:assert";
import { test } from "node:test";

import { splitBarrel } from "./barrels.ts";

await test("splits a barrel into its styled and headless entries", () => {
  const barrel = [
    'export { default as IButton } from "./components/button/styled/IButton";',
    'export { default as IButtonBase } from "./components/button/headless/IButtonBase";',
    "",
  ].join("\n");
  deepStrictEqual(splitBarrel(barrel), {
    index: 'export { default as IButton } from "./components/button/styled/IButton";\n',
    headless:
      'export { default as IButtonBase } from "./components/button/headless/IButtonBase";\n',
  });
});

await test("fails on a line in neither directory", () => {
  const barrel = [
    'export { default as IButton } from "./components/button/styled/IButton";',
    'export { default as IButtonBase } from "./components/button/headless/IButtonBase";',
    'export { default as Stray } from "./components/button/Stray";',
  ].join("\n");
  throws(() => splitBarrel(barrel), /Stray/);
});

await test("fails on a barrel with no headless component", () => {
  throws(() =>
    splitBarrel('export { default as IButton } from "./components/button/styled/IButton";'),
  );
});
