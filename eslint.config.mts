import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-empty': 'off',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-constant-binary-expression': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
//   {
//     files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
//     plugins: { js },
//     extends: ['js/recommended'],
//   },
//   tseslint.configs.recommended,
//   eslintConfigPrettier,
//   {
//     plugins: {
//       'simple-import-sort': simpleImportSort,
//     },
//     rules: {
//       'no-empty': 'off',
//       eqeqeq: ['error', 'always'],
//       curly: ['error', 'all'],
//       'no-console': 'warn',
//       '@typescript-eslint/no-unused-vars': 'error',
//       '@typescript-eslint/no-namespace': 'off',
//       '@typescript-eslint/no-explicit-any': 'off',
//       'no-constant-binary-expression': 'off',
//       '@typescript-eslint/naming-convention': [
//         'error',
//         {
//           selector: 'interface',
//           format: ['PascalCase'],
//           custom: {
//             regex: '^I[A-Z]',
//             match: true,
//           },
//         },
//       ],
//       'simple-import-sort/imports': 'error',
//       'simple-import-sort/exports': 'error',
//     },
//   },
// ]);
