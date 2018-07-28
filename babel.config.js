module.exports = {
  presets: [
    ['@vue/app',{}]
  ],
  plugins: [
    "syntax-dynamic-import","equire",
    [
      "component-scss",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk/src",
        "ext":".scss"
      }
    ]
  ]
};