import { defineTestConfig } from "@unframework.dev/testing/config";

// One case per directory under `test/`, each with its spec and the component it mounts.
export default defineTestConfig({ include: ["test/**/*.test.ts"] });
