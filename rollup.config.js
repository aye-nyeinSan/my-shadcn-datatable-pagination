// rollup.config.js
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import resolve, { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";


import pkg from "./package.json" with { type: "json" };
// const pkg = require("./package.json"); // Use CommonJS require() for package.json in Rollup config


// Extract peer dependencies as external
const peerDependencies = Object.keys(pkg.peerDependencies || {});

export default [
  {
    input: "src/index.ts",
    output: [
      {
        // Browser-friendly UMD build
        file: pkg.browser,
        format: "umd",
        name: "ShadcnTablePagination",
        sourcemap: true,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@tanstack/react-table": "ReactTable",
          "lucide-react": "lucideReact",
          "class-variance-authority": "classVarianceAuthority",
          clsx: "clsx",
          "tailwind-merge": "tailwindMerge",
        },
      },
      {
        // Browser-friendly ESM build
        file: pkg.module,
        format: "es",
        sourcemap: true,
      },
      {
        // Browser-friendly CJS build
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*.test.ts", "**/*.test.tsx", "node_modules"],
        declaration: true,
        declarationDir: "dist",
        sourceMap: true,
      }),
      babel({
        babelHelpers: "bundled",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        exclude: "node_modules/**",
        include: ["src/**/*"],
        presets: [
          ["@babel/preset-env", { targets: { browsers: "last 2 versions" } }],
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
      }),
      terser(),
      nodeResolve({
        browser: true,
        preferBuiltins: false,
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      postcss({
        extract: true, 
        modules: false,
        use: ["sass"],
}),
    ],
    external: (id) => peerDependencies.includes(id),
  },
];
