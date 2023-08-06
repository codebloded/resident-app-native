module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            components: "./components",
            screens: "./screens",
            navigations: "./navigation",
            assets: "./assets",
            themes: "./theme",
            zusState: "./zustand",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
