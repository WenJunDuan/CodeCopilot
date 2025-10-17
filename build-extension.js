const esbuild = require("esbuild");
const path = require("path");

const isWatch = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: ["src/extension/extension.ts"],
  bundle: true,
  outfile: "dist/extension.js",
  external: ["vscode", "better-sqlite3"],
  format: "cjs",
  platform: "node",
  target: "node18",
  sourcemap: true,
  minify: false,
  // 关键：添加tsconfig路径
  tsconfig: "./tsconfig.json",
  // 手动解析路径
  plugins: [
    {
      name: "resolve-paths",
      setup(build) {
        build.onResolve({ filter: /^\.\.?\// }, (args) => {
          return {
            path: path.resolve(args.resolveDir, args.path),
            external: false,
          };
        });
      },
    },
  ],
};

async function build() {
  try {
    if (isWatch) {
      const ctx = await esbuild.context(buildOptions);
      await ctx.watch();
      console.log("👀 Watching extension files...");
    } else {
      await esbuild.build(buildOptions);
      console.log("✅ Extension build complete!");
    }
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

build();
