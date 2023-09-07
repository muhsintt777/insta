import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      layouts: "/src/layouts",
      assets: "/src/assets",
      utils: "/src/utils",
      configs: "/src/configs",
    },
  },
});
