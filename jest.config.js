module.exports = {
  "testPathIgnorePatterns": ["test/.*(react-native).test.js$"],
  "setupFiles": [
    "jest-localstorage-mock",
    "./setupJest.js"
  ]
};