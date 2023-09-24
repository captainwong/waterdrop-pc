module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'eslint-config-airbnb',
    'eslint-config-airbnb/hooks',
    'eslint-config-airbnb-typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'plopfile.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react-refresh', '@typescript-eslint/eslint-plugin'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'react-hooks/exhaustive-deps': 1,
    'arrow-body-style': 0,
    'operator-linebreak': 0,
    'prettier/prettier': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx', ],
      },
    },
  },
}
