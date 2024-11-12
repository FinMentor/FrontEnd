import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        VitePWA({
            srcDir: "/",
            filename: "sw.js",
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
                type: "module",
            },
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        proxy: {
            "/api": {
                // eslint-disable-next-line no-undef
                target: process.env.VITE_API_URL,
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ""),
            },
        },
    },
});
