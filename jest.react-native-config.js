module.exports = {
  "testRegex": "test/.*(react-native)\.test\.js$",
  "setupFiles": [
    "jest-localstorage-mock",
    "./setupJest.js"
  ],
  "preset": "react-native"
};