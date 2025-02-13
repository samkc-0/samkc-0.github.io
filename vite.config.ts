import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/samkc-0.github.io/", // Required for GitHub Pages
  build: {
    outDir: "dist", // This is the folder you will deploy
  },
});
