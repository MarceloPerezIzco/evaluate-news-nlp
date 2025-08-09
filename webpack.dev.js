import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: "development",
    entry: "./src/client/js/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        libraryTarget: "var",
        library: "Client",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    devServer: {
        static: path.resolve(__dirname, "dist"),
        port: 8080,
        open: true,
        hot: true,
        watchFiles: ["src/client/views/*.html"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
        }),
    ],
};
