import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { VitePWA } from "vite-plugin-pwa";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // 새 버전 생기면 자동 업데이트
      devOptions: {
        enabled: false, // 개발 중에는 SW 끔
      },
      workbox: {
        // 이미지나 정적 파일은 네트워크 우선으로 캐싱
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "images-cache",
            },
          },
        ],
      },
      includeAssets: [
        "favicons/favicon.ico",
        "favicons/apple-touch-icon.png",
        "favicons/favicon-96x96.png",
        "favicons/favicon.svg",
      ],
      manifest: {
        name: "스토어리",
        short_name: "스토어리",
        description: "가게 스토리, 캐릭터가 되다. 스토어리",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "favicons/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicons/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0", // 모든 네트워크 IP에서 접근 가능
    port: 5173,
  },
  preview: { port: 5173 },
});
