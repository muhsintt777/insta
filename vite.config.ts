import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      components: "/src/components",
      layouts: "/src/layouts",
      screens: "/src/screens",
      utils: "/src/utils",
      configs: "/src/configs",
    },
  },
});
