import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src/webview"),
      "@core": resolve(__dirname, "src/core"),
      "@agents": resolve(__dirname, "src/agents"),
      "@extension": resolve(__dirname, "src/extension"),
      "@components": resolve(__dirname, "src/webview/components"),
      "@views": resolve(__dirname, "src/webview/views"),
      "@utils": resolve(__dirname, "src/webview/utils"),
      "@types": resolve(__dirname, "src/types"),
    },
    extensions: [".ts", ".tsx", ".vue", ".js", ".json"],
  },

  build: {
    outDir: "dist/webview",
    emptyOutDir: true,
    sourcemap: true,
    minify: "esbuild",
    target: "esnext",

    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/webview/index.html"),
      },
      output: {
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".");
          const ext = info?.[info.length - 1];

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || "")) {
            return `images/[name]-[hash][extname]`;
          } else if (/woff2?|ttf|otf|eot/i.test(ext || "")) {
            return `fonts/[name]-[hash][extname]`;
          } else if (ext === "css") {
            return `css/[name]-[hash][extname]`;
          }

          return `assets/[name]-[hash][extname]`;
        },

        manualChunks: {
          "vue-vendor": ["vue"],
          "marked-vendor": ["marked"],
        },
      },
    },

    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
  },

  server: {
    port: 3000,
    host: true,
    open: false,
    cors: true,
    strictPort: true,
  },

  optimizeDeps: {
    include: ["vue", "marked"],
    exclude: ["vscode"],
  },

  envPrefix: "VITE_",
  base: "./",
});
