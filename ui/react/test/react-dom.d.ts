// `react-dom` ships no declarations, and the workspace has no `@types/react-dom`. This declares the
// part of its client API that `model-echo.test.ts` renders with.
declare module "react-dom/client" {
  import type { ReactNode } from "react";

  export interface Root {
    render(children: ReactNode): void;
    unmount(): void;
  }

  export function createRoot(container: Element): Root;
}
