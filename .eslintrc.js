module.exports = {
  extends: ['@borealisgroup'],
  parser: "babel-eslint",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2021,
    sourceType: "module"
  },
  globals: {
    ThreeGlobe: true,
    THREE: true
  },
  overrides: [
    {
      files: ["scripts/**/*"],
      rules: {
        "import/extensions": 0
      }
    }
  ],
};
