import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
        secure: false,
      },
      // REMOVED /profile proxy to avoid conflict with frontend routes like /profile/settings
      "/meals": { target: "http://127.0.0.1:5000", changeOrigin: true, secure: false },
      "/water": { target: "http://127.0.0.1:5000", changeOrigin: true, secure: false },
      "/habits": { target: "http://127.0.0.1:5000", changeOrigin: true, secure: false },
      "/trainers": { target: "http://127.0.0.1:5000", changeOrigin: true, secure: false },
      "/bookings": { target: "http://127.0.0.1:5000", changeOrigin: true, secure: false },
      "/chat": { target: "http://127.0.0.1:5000", changeOrigin: true, secure: false },
      "/products": { target: "http://127.0.0.1:5000", changeOrigin: true, secure: false },
      "/cart": { target: "http://127.0.0.1:5000", changeOrigin: true, secure: false },
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      { find: /^lodash\/(?!.*\.js$)(.*)$/, replacement: "lodash/$1.js" },
    ],
  },
}));
