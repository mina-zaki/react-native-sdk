module.exports = {
  "testPathIgnorePatterns": ["test/.*(react-native).test.js$"],
  "setupFiles": [
    "jest-localstorage-mock",
    "./setupJest.js"
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!(react-native-app-auth|react-native|react-native-implementation)/)"
  ]
};