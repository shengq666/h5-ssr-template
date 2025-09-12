import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  {
    // 针对 TypeScript 文件的宽松规则配置
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // 允许使用 any 类型
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;
