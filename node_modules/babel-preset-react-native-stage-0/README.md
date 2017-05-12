# babel-preset-react-native-stage-0

Have you encountered weird errors in React Native when trying to use `babel-preset-react-native` and `babel-preset-stage-0` together? Are you generally just confused and frustrating by how hard it is to use the latest and greatest Babel features on RN? This preset is for you!

## Installation

```bash
npm install babel-preset-react-native-stage-0 --save
```

## Usage

Just add a `.babelrc` file to your React Native project that looks like this:

```json5
{
  "presets": ["react-native-stage-0"]
}
```

Do you want/need experimental legacy decorator support (provided by [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy))? Use this as your .babelrc instead:

```json5
{
  "presets": ["react-native-stage-0/decorator-support"]
}
```

## Troubleshooting

**Q**: I added `stage-0` to my "presets" list, and now everything is broken!

**A**: Don't do that! This preset supersedes the need for including the stage-0 preset, and works properly with React Native.

---

**Q**: I changed my .babelrc to the above, but I'm still getting strange Babel errors!

**A**: Have you cleared your packager cache? Run the following:

```bash
watchman watch-del-all
[the command you use to start the packager] --reset-cache
```

If things are still broken, open an issue and I'll try to help you. I may say "not a problem with this preset", and make you go open an issue on the react-native repo. Don't be mad at me if I do that!
