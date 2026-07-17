import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // 1. 必ず一番最初に ignores を宣言する
  globalIgnores([
    "**/node_modules/**",
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "next-env.d.ts",
    "**/generated/**/*", // より確実にマッチさせる記述に変更
  ]),
  // 2. その後にプラグインやルールを展開する
  ...nextVitals,
  ...nextTs,
]);

export default eslintConfig;
