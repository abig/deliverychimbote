const rules = {
  "indent": [
    "error",
    2,
    { "SwitchCase": 1 }
  ],
  "linebreak-style": [
    "error",
    "unix"
  ],
  "semi": [
    "error",
    "always"
  ],
  "eol-last": [
    "error",
    "always"
  ],
  "eqeqeq": [
    "error",
    "always"
  ],
  "react/jsx-uses-react": "off",
  "react/react-in-jsx-scope": "off",
  // Temporarily disable until we migrate to TypeScript
  "react/prop-types": "off",
};

module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@next/next/core-web-vitals",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "rules": {
    ...rules,
  },
  // Disabled until codebase is migrated to TypeScript
  // "overrides": [
  //   {
  //     "files": ["src/**/*.ts", "src/**/*.tsx"],
  //     "env": {
  //       "browser": true,
  //       "es2021": true,
  //       "node": true
  //     },
  //     "extends": [
  //       "eslint:recommended",
  //       "plugin:react/recommended",
  //       "plugin:@typescript-eslint/recommended",
  //       "plugin:@next/next/core-web-vitals",
  //     ],
  //     "parser": "@typescript-eslint/parser",
  //     "parserOptions": {
  //       "ecmaFeatures": {
  //         "jsx": true
  //       },
  //       "ecmaVersion": 12,
  //       "sourceType": "module"
  //     },
  //     "plugins": [
  //       "react",
  //       "@typescript-eslint"
  //     ],
  //     "settings": {
  //       "react": {
  //         "version": "detect",
  //       },
  //     },
  //     "rules": {
  //       ...rules,
  //       "no-unused-vars": 0,
  //       "react/prop-types": 0,
  //     },
  //   }
  // ],
};
