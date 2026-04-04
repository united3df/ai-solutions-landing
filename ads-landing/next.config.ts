import type { NextConfig } from "next";
import { fileURLToPath } from "url";

const appRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig: NextConfig = {
  // Monorepo / workspace: default repo root may be above this package, so CSS
  // `@import "tailwindcss"` must resolve from this app's node_modules.
  turbopack: {
    root: appRoot,
  },
};

export default nextConfig;
