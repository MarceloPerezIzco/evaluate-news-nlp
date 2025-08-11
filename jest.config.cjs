/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: "jsdom",
    testMatch: ["**/__test__/**/*.spec.js"],
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    // moduleNameMapper: {
    //     "\\.(css|scss|sass)$": "identity-obj-proxy",
    // },
};
