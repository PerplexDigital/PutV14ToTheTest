import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    lib: {
      entry: "src/main.tsx", // your web component source file
      name: "hello",
      formats: ["es"],
    },
    outDir: "../../App_Plugins/React", // all compiled files will be placed here
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/], // ignore the Umbraco Backoffice package in the build
    },
  },
  define: {
    'process.env.NODE_ENV': true
  },
  base: "/App_Plugins/React/", // the base path of the app in the browser (used for assets)
  plugins: [
    react()
  ],
});