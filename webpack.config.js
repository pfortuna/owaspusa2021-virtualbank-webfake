const path = require("path")

// Used to determine whether to watch the files or build.
const env = process.env.WEBPACK_ENV || "development"

module.exports = {
  // The main file for the bundle.
  entry: {
    totp: "./build/src/totp.js",
    login: "./build/src/login.js",
    settings: "./build/src/settings.js",
  },
  output: {
      filename: '[name].js',
//     // Name of the bundle file.
//     filename: "./build/dist/bundle.js",
//     // Directory in which the bundle should be placed.
//     // Here we're saying `dist/js/bundle.js` will be our bundled file.
     path: path.resolve(__dirname, "public/js"),
//     // These two library items tells webpack to make the code exported by main.js available as a variable called `App`.
     libraryTarget: "var",
     library: "totp"
  },
  mode: "production",
  // If we're in development mode, then watch for changes, otherwise just do a single build.
  watch: env !== "production"
}