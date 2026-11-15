import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

import { buildApiReport, formatApiReport } from "../../components/scripts/api-report.ts";

// The API this package ships, rebuilt from its build and compared with the committed report. A
// difference is an API change: update `api.json` with the command in `api-report.ts`, and list
// every changed line in this package's changeset.
it("ships the API that api.json records", async () => {
  const emitted = fileURLToPath(new URL("../.inkline", import.meta.url));
  const expected = readFileSync(new URL("api.json", import.meta.url), "utf8");
  expect(formatApiReport(await buildApiReport("react", emitted))).toBe(expected);
});
