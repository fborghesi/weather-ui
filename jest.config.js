module.exports = {
    "preset": "react-native",
    "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
    "transformIgnorePatterns": ["/node_modules/@react-native-community/async-storage/(?!(lib))"],
};