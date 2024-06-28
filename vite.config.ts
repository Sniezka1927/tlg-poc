import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    // inject({
    //   Buffer: ["buffer", "Buffer"],
    // }),
  ],
  build: {
    outDir: "./docs",
    rollupOptions: {
      plugins: [
        // This ensures buffer is available globally if needed
        inject({
          Buffer: ["buffer", "Buffer"],
        }),
      ],
    },
  },
  base: "./",
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
});
