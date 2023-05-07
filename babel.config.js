module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./source/'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          hooks: './source/hooks',
          screens: './source/screens',
          components: './source/components',
          common: './source/common',
        },
      },
    ],
  ],
};
