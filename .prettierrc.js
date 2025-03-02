module.exports = {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  jsxBracketSameLine: true,
  jsxSingleQuote: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^[./]',
    '^@base',
    '^@base/(.*)$',
    '^@pages',
    '^@pages/(.*)$',
    '^@widgets',
    '^@widgets/(.*)$',
    '^@features',
    '^@features/(.*)$',
    '^@shared',
    '^@shared/(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
};