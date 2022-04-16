const webpack = require("webpack");
module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.resolve = {
    fallback: {
      url: require.resolve("url"),
      assert: require.resolve("assert"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert"),
    },
    extensions: ["*", ".mjs", ".js", ".jsx", ".ts", ".tsx"],
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      sprocess: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  return config;
};
