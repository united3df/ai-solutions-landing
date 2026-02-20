import { useEffect } from "react";

/**
 * Initializes Microsoft Clarity analytics.
 * Reads project ID from NEXT_PUBLIC_CLARITY_ID env variable.
 */
export function useClarity() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (!projectId) return;

    if ((window as Window & { clarity?: unknown }).clarity) return;

    (function (
      c: Record<string, unknown>,
      l: Document,
      a: string,
      r: string,
      i: string
    ) {
      c[a] =
        c[a] ||
        function () {
          const fn = c[a] as { q?: unknown[] };
          (fn.q = fn.q || []).push(arguments);
        };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = `https://www.clarity.ms/tag/${i}`;
      const y = l.getElementsByTagName(r)[0];
      y?.parentNode?.insertBefore(t, y);
    })(
      window as unknown as Record<string, unknown>,
      document,
      "clarity",
      "script",
      projectId
    );
  }, []);
}
