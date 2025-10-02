export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  endOfLine: 'auto',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react', // React imports
    '^@?\\w', // External packages (node_modules)
    '^@/(.*)$', // Alias (@/...)
    '^[./]', // Relative imports (./...)/)
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
