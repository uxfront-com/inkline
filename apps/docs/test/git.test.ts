import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { lastModified } from "../server/lib/git.ts";

/**
 * The sitemap's dates come from lastModified(). A build without Git history must
 * still finish, since `generate` fails on any page that doesn't prerender.
 */
describe("lastModified", () => {
  const dirs: Array<string> = [];
  const tempDir = () => {
    const dir = mkdtempSync(join(tmpdir(), "inkline-git-"));
    dirs.push(dir);
    return dir;
  };

  afterEach(() => {
    vi.restoreAllMocks();
    for (const dir of dirs.splice(0)) {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("returns an empty map outside a repository, and warns", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const dates = lastModified(["content/docs", "app/pages/index.vue"], tempDir());
    expect(dates).toEqual(new Map());
    expect(warn).toHaveBeenCalledOnce();
  });

  it("dates each file by its last commit in UTC, keyed from cwd by its own name", () => {
    const repo = tempDir();
    const app = join(repo, "apps", "docs");
    mkdirSync(join(app, "app", "pages"), { recursive: true });
    const git = (date: string, ...args: Array<string>) =>
      execFileSync(
        "git",
        ["-c", "user.name=t", "-c", "user.email=t@t", "-c", "commit.gpgsign=false", ...args],
        {
          cwd: repo,
          env: { ...process.env, GIT_COMMITTER_DATE: date, GIT_AUTHOR_DATE: date },
        },
      );
    git("2026-01-01T00:00:00Z", "init", "-q");
    // `[framework].vue` would match `f.vue` as a glob pattern.
    writeFileSync(join(app, "app", "pages", "[framework].vue"), "a");
    writeFileSync(join(app, "app", "pages", "f.vue"), "a");
    writeFileSync(join(app, "app", "pages", "é.vue"), "a");
    git("2026-01-01T00:00:00Z", "add", "-A");
    git("2026-01-01T00:00:00Z", "commit", "-qm", "one");
    writeFileSync(join(app, "app", "pages", "f.vue"), "b");
    // 00:30 on the 3rd at +02:00 is the 2nd in UTC.
    git("2026-01-03T00:30:00+02:00", "commit", "-qam", "two");

    expect(lastModified(["app/pages/[framework].vue"], app)).toEqual(
      new Map([["app/pages/[framework].vue", "2026-01-01"]]),
    );
    expect(lastModified(["app/pages"], app)).toEqual(
      new Map([
        ["app/pages/f.vue", "2026-01-02"],
        ["app/pages/[framework].vue", "2026-01-01"],
        ["app/pages/é.vue", "2026-01-01"],
      ]),
    );
  });
});
