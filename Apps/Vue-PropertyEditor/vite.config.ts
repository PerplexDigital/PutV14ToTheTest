import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    lib: {
      entry: "src/main.ts", // your web component source file
      name: "hello",
      formats: ["es"],
    },
    outDir: "../../App_Plugins/VuePropertyEditor", // all compiled files will be placed here
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/], // ignore the Umbraco Backoffice package in the build
    },
  },
  define: {
    'process.env.NODE_ENV': true
  },
  base: "/App_Plugins/VuePropertyEditor/", // the base path of the app in the browser (used for assets)
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith("uui-"),
        },
      },
    })
  ],
});