module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
  // show prettier rules as eslint problems
  // for prettier config, see .prettierrc.js
  plugins: ['prettier'],
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    // must be at the end. Disables eslint formatting rules in favor of prettier
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error', // shows prettier rules as eslint errors
    quotes: 'off',
    'no-sparse-arrays': 'off',
    'no-console': 'off',
    'react/prop-types': 'off',
    'flowtype/space-before-type-colon': 'off',
    'react-native/no-inline-styles': 'off',
    'consistent-this': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-namespace': ['error', {allowDeclarations: true}], // rules can have options. Use array like this.
  },
};
