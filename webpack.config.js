const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: path.resolve(__dirname, "src", "index.tsx"), // 프로젝트가 시작되는 파일을 지정
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        // 다양한 파일 형식을 처리하기 위한 규칙을 정의함
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"], //css 파일 처리
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                icon: true,
              },
            },
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?ver=[hash]", //이미지 파일 처리
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|jpeg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?ver=[hash]", // 이미지 파일을 번들링할시 사용되는 파일명규칙
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(ts|js)x?$/, // .tsx 또는.jsx파일을 babel-loader를 통해 변환
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader", // 자바스크립트 와 타입스크립트 변환
            },
          ],
        },
      ],
    },
    output: {
      //번들링된 파일이 저장될 위치와 이름을 지정
      path: path.resolve(__dirname, "dist"),
      chunkFilename: "[name].js?ver=[hash]",
      filename: "[name].js?ver=[hash]",
      publicPath: "/",
    },
    devtool: isProduction ? "source-map" : "inline-source-map", //production모드에서는  sourceMap 아닐시 inline-sourceMap
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      minimize: isProduction, // production 모드에서만 코드 압축
    },
    plugins: [
      //빌드 프로세스를 도와주는 플러그인
      new CleanWebpackPlugin(), //이전 빌드 파일을 삭제
      new HtmlWebpackPlugin({
        //HTML 파일을 생성하고, 번들링된 자바스크립트를 자동으로 포함
        template: path.resolve(__dirname, "src", "index.html"), //이거 만들어줘야함
      }),
      new Dotenv({
        //환경변수 로드
        allowEmptyValues: true,
        systemvars: true,
      }),
    ],
  };
};
