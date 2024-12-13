import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
  },
  resolve: {
    alias: {
      "~": "/src",
    },
  },
})
