import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', '.tmp/**', '.tmp*/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
