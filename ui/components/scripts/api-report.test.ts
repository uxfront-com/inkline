import { strictEqual } from "node:assert";
import { test } from "node:test";

import { diffReports } from "./api-report.ts";

const report = (...lines: Array<string>) => `${lines.join("\n")}\n`;

await test("finds no difference between equal reports", () => {
  strictEqual(diffReports(report("a", "b"), report("a", "b")), "");
});

await test("shows a renamed prop as the committed line and the built one", () => {
  const committed = report("{", '  "props": [', '    "disabled",', '    "isLoading",', "  ]", "}");
  const built = report("{", '  "props": [', '    "disabled",', '    "loading",', "  ]", "}");
  strictEqual(
    diffReports(committed, built),
    report(
      '    "props": [',
      '      "disabled",',
      '-     "isLoading",',
      '+     "loading",',
      "    ]",
      "  }",
    ),
  );
});

await test("shows only the context around changes, and marks the lines it skips", () => {
  const committed = report("1", "2", "3", "4", "5", "6", "7", "8");
  const built = report("1", "2b", "3", "4", "5", "6", "7b", "8");
  strictEqual(
    diffReports(committed, built, 1),
    report("  1", "- 2", "+ 2b", "  3", "…", "  6", "- 7", "+ 7b", "  8"),
  );
});

await test("shows a removed and an added line", () => {
  strictEqual(diffReports(report("a", "b", "c"), report("a", "c")), report("  a", "- b", "  c"));
  strictEqual(diffReports(report("a", "c"), report("a", "b", "c")), report("  a", "+ b", "  c"));
});

await test("shows every built line when no report is committed", () => {
  strictEqual(diffReports("", report("a", "b")), report("+ a", "+ b"));
});

await test("names a missing final newline, which no line shows", () => {
  strictEqual(diffReports("a", "a\n"), report("(only the final newline differs)"));
});
