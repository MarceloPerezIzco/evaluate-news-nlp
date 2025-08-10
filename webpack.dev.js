const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/client/js/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
};
