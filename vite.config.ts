import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      layouts: "/src/layouts",
      main: "/src/main",
      pages: "/src/pages",
      screens: "/src/screens",
      services: "/src/services",
      utils: "/src/utils",
      configs: "/src/configs",
      features: "/src/features",
      hooks: "/src/hooks",
    },
  },
});
