import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.browser,
        ...globals.node,  // 添加 Node.js 环境支持
      },
    },
    rules: {
      // 启用 no-undef 规则
      "no-undef": "error",
      // 你可以在这里添加更多规则
      // 例如 "semi": ["error", "always"] 以强制使用分号
    }
  },
  pluginJs.configs.recommended,
];