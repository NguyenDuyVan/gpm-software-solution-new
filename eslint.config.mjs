// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import prettier from 'eslint-plugin-prettier';

export default withNuxt()
  .prepend()
  .override('nuxt/rules', {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': 'off',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/no-v-html': 'off',
    },
    plugins: { prettier: prettier },
  });

// export default withNuxt([
//   {
//     ...tseslint.configs.recommended,
//     plugins: { prettier: prettier },
//     files: ['src/**/*.{js,ts,vue}'],
//     rules: {
//       'vue/multi-word-component-names': 'off',
//       'vue/html-self-closing': 'off',
//       'no-console': 'warn',
//       'no-unused-vars': 'warn',
//       'prettier/prettier': 'warn',
//     },
//   },
// ]);
