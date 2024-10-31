import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  ...pluginVue.configs["flat/recommended"],
  eslintConfigPrettier,
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.

  {
    plugins: {
      // You’d typically use one of the following two:
      // typescriptEslint: typescriptEslint,
      // typescriptEslint,
      // But in this example we give it another name.
      // It might be tempting to use something shorter like “ts”:
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto", // 줄 끝 스타일을 자동으로 설정 (CRLF/LF 혼용 허용)
        },
      ],
      "vue/component-api-style": [
        "error",
        ["script-setup", "composition"], // "script-setup", "composition", "composition-vue2", or "options"
      ],
      "vue/no-unused-vars": "error", // Vue.js에서 사용되지 않는 변수 에러 처리
    },
  },
];
