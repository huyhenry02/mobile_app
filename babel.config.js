module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".ios.ts", ".android.ts", ".ios.tsx", ".android.tsx", ".ts", ".tsx", ".js", ".json"],
        alias: {
          "^\\/(.+)": "./src/\\1",
        },
      },
      "react-native-paper/babel",
    ],
    "@babel/plugin-proposal-export-namespace-from",
    "react-native-reanimated/plugin",
  ],
}
