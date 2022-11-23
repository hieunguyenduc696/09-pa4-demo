const CleanCSSPlugin = require("less-plugin-clean-css");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const path = require("path");

const getStyleLoaders = (cssOptions, preProcessor, preProcessorOptions) => {
  const loaders = [
    require.resolve("style-loader"),
    {
      loader: require.resolve("@teamsupercell/typings-for-css-modules-loader"),
    },
    {
      loader: require.resolve("css-loader"),
      options: cssOptions,
    },
  ].filter(Boolean);

  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve("resolve-url-loader"),
        options: {
          sourceMap: true,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          ...preProcessorOptions,
          sourceMap: true,
        },
      }
    );
  }
  return loaders;
};

module.exports = function override(config, env) {
  config.module.rules[1].oneOf.splice(
    2,
    0,
    ...[
      {
        test: /\.less$/i,
        exclude: /\.module\.(less)$/,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: true,
          },
          "less-loader",
          {
            lessOptions: {
              javascriptEnabled: true,
              plugins: [new CleanCSSPlugin({ advanced: true })],
            },
          }
        ),
      },
      {
        test: /\.module\.(less)$/,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: true,
            modules: {
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
          "less-loader",
          {
            lessOptions: {
              javascriptEnabled: true,
              plugins: [new CleanCSSPlugin({ advanced: true })],
            },
          }
        ),
      },
      {
        test: /\.(d.ts)$/,
        include: [path.join(__dirname, "src")],
        use: [
          {
            loader: "null-loader",
          },
        ],
      },
    ]
  );

  return config;
};
