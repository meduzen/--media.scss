const postcssPresetEnv = require('postcss-preset-env');

module.exports = ({ options, env }) => ({
  plugins: [
    postcssPresetEnv({
      stage: 0,
      features: {
        'prefers-color-scheme-query': false,
      }
    }),
  ]
})
