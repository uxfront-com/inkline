// Runs before `nuxt generate`: fetches the repository's full history when the
// checkout is shallow, since the sitemap dates each page by the last commit that
// changed it (server/lib/git.ts), and in a shallow clone every page would date
// from the one commit there is. Says which it found, so a build log shows
// whether the clone was shallow.
//
// It never stops the build. With no Git history at all (no `git`, or no `.git`,
// like an upload with no repository), it warns and exits 0, and the sitemap
// dates every page by the build day.
import { execFileSync } from "node:child_process";

const git = (...args) =>
  execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    // A fetch that needs credentials fails instead of waiting for a prompt.
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
  }).trim();

const reasonOf = (error) => error.stderr?.toString().trim() || error.message;

const shallow = () => git("rev-parse", "--is-shallow-repository") === "true";

let isShallow;
try {
  isShallow = shallow();
} catch (error) {
  console.warn(
    `fetch-history: found no Git history, so the sitemap dates every page by the build day.\n${reasonOf(error)}`,
  );
}

if (isShallow) {
  console.log(
    "fetch-history: the clone is shallow, so fetching its full history for the sitemap's dates.",
  );
  let reason = "";
  try {
    git("fetch", "--unshallow", "--quiet");
  } catch (error) {
    reason = `\n${reasonOf(error)}`;
  }
  let still = true;
  try {
    still = shallow();
  } catch (error) {
    reason += `\n${reasonOf(error)}`;
  }
  // The site still builds, with every page dated by the latest commit.
  if (still) {
    console.warn(
      `fetch-history: the clone is still shallow, so the sitemap dates every page by the latest commit.${reason}`,
    );
  }
} else if (isShallow === false) {
  console.log("fetch-history: the clone has its full history.");
}
