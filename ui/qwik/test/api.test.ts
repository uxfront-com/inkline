import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { expect, it } from "vitest";

// The API this package ships, rebuilt from its build and compared with the committed report. A
// difference is an API change: update `api.json` with the command in `api-report.ts`, and list
// every changed line in this package's changeset. The report runs in a child process, through that
// same command, because V8 coverage, which CI turns on, makes TypeScript's checker about four times
// slower in the test worker and measures nothing here.
it("ships the API that api.json records", async ({ signal }) => {
  const script = fileURLToPath(new URL("../../components/scripts/api-report.ts", import.meta.url));
  const emitted = fileURLToPath(new URL("../../components/dist/qwik", import.meta.url));
  const expected = readFileSync(new URL("api.json", import.meta.url), "utf8");
  const { stdout } = await promisify(execFile)(process.execPath, [script, "qwik", emitted], {
    signal,
  });
  expect(stdout).toBe(expected);
});
