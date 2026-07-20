import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this worktree. Two package-lock.json files exist
  // (parent repo + this worktree), so Turbopack otherwise infers the parent as
  // root and resolves node_modules/.next from the wrong place.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
