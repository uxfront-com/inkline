import { execFileSync } from "node:child_process";

/**
 * The day each file under `paths` was last changed, like `2026-11-14`, by its
 * last commit (the committer's date, which is when it reached the branch), keyed
 * by its path from `cwd`, like `content/docs/03.components/01.button.md`.
 *
 * The day is the commit's in UTC, not in the committer's time zone. A sitemap
 * reads a bare day as midnight UTC, so a commit made at 00:03 +02:00 on the 21st,
 * dated by its local day, would claim a change two hours before it happened.
 *
 * The site is static, so this runs when the sitemap is prerendered, from this
 * app's directory, or from `cwd`. `git log` names files from the repository's
 * root, so `--relative` keys them from `cwd` instead. The paths are literal,
 * since `app/pages/[framework].vue` would otherwise be a glob.
 *
 * It needs the repository's history: in a shallow clone every file dates from
 * the one commit there is, which scripts/fetch-history.mjs prevents before
 * `nuxt generate`. With no Git at all (no `git`, or no `.git`), it warns and
 * returns an empty map, so the build carries on and the sitemap dates the pages
 * by the build day.
 */
export function lastModified(paths: Array<string>, cwd?: string): Map<string, string> {
  const dates = new Map<string, string>();
  let log: string;
  try {
    // %ct is the committer's time in seconds since the epoch, which has no zone.
    log = execFileSync(
      "git",
      [
        // Names like `é.md` as they are, not quoted as `"\303\251.md"`.
        "-c",
        "core.quotePath=false",
        "--literal-pathspecs",
        "log",
        "--relative",
        "--format=%x00%ct",
        "--name-only",
        "--",
        ...paths,
      ],
      { cwd, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] },
    );
  } catch (error) {
    const reason = (error as { stderr?: string }).stderr?.trim() || (error as Error).message;
    console.warn(
      `lastModified: no Git history, so the sitemap dates pages by the build day. ${reason}`,
    );
    return dates;
  }
  // Newest commit first, so a file's first appearance is its last change.
  for (const commit of log.split("\0").slice(1)) {
    const [seconds, ...files] = commit.trim().split("\n");
    const date = new Date(Number(seconds) * 1000).toISOString().slice(0, 10);
    for (const file of files) {
      if (file && !dates.has(file)) {
        dates.set(file, date);
      }
    }
  }
  return dates;
}
