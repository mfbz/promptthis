import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/promptthis" : "",
  images: { unoptimized: true },
  transpilePackages: ["@promptthis/core", "@promptthis/react", "pixelarticons"],
};

export default nextConfig;
