const STATE_OF_RULE = {
  OFF: 'off',
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx"]
      }
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
  ],
  rules: {
    'react/jsx-filename-extension': STATE_OF_RULE.OFF,
    'react/forbid-prop-types': STATE_OF_RULE.OFF,
    'import/prefer-default-export': STATE_OF_RULE.OFF,
  },
};
