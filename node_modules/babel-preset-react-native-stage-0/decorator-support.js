module.exports = {
  presets: [require('babel-preset-react-native')],
  plugins: [
    require('babel-plugin-transform-decorators-legacy').default,
    require('babel-plugin-transform-do-expressions'),
    require('babel-plugin-transform-function-bind'),
    require('babel-plugin-transform-class-constructor-call'),
    require('babel-plugin-transform-export-extensions'),
    require('babel-plugin-syntax-trailing-function-commas'),
    require('babel-plugin-transform-exponentiation-operator'),
  ]
}
