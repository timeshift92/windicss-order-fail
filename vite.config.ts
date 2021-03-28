import { resolve } from "path";
import svelte from "@svitejs/vite-plugin-svelte";
import windiCSS from "vite-plugin-windicss";
import { minify } from "html-minifier";
import preprocessOptions from './svelte.config'

// const { defineConfig } = require("vite");
import { defineConfig } from "vite"
const indexReplace = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return minify(html, {
        collapseWhitespace: true,
      });
    },
  };
};

export default defineConfig(({ command, mode }) => {

  const isProduction = mode === "production";
  return {
    build: {
      polyfillDynamicImport: false,
      cssCodeSplit: false,
      minify: isProduction,
    target:'es2020',

    },
    optimizeDeps: {
      exclude: ["@roxi/routify"],
    },
    resolve: {
      dedupe: ['@roxi/routify'],
      alias: {
        svelte: resolve(__dirname, "node_modules/svelte"),
        '@': resolve(__dirname, './src'),
        '@src': resolve(__dirname, './src'),
        '@base': resolve(__dirname, './src/components/base'),
        '@co': resolve(__dirname, 'src/components'),
        '@core': resolve(__dirname, 'src/core'),
        '@l': resolve(__dirname, 'src/layouts'),
        '@f': resolve(__dirname, 'src/features'),
        // 'src': resolve('src')
      },
    },
    plugins: [

      windiCSS({
        //@ts-ignore
        verbose: true,
        silent: false,
        debug: true,
        config: "tailwind.config.js", // tailwind config file path (optional)
        compile: false, // false: interpretation mode; true: compilation mode
        prefix: "windi-", // set compilation mode style prefix
        globalPreflight: true, // set preflight style is global or scoped
        globalUtility: true, // set utility style is global or scoped
      }),
      svelte({
        //@ts-ignore
        hot: !isProduction,
        emitCss: true,
        extensions: ['.md', '.svx', '.svelte'],
        // preprocess: preprocessOptions.preprocess,
      }),
      indexReplace(),
    ],
  };
});
