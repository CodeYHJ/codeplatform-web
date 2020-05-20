class InjectCDN {
  constructor(options) {
    this.options = Object.assign({ js: [] }, options);
  }
  apply(compiler) {
    compiler.hooks.compilation.tap("compilation", (compilation) => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
        "html-webpack-plugin-before-html-processing",
        (pluginData, cb) => {
          pluginData.assets.js = [...this.options.js, ...pluginData.assets.js];
          if (cb) return cb(null, pluginData);
          return Promise.resolve(pluginData);
        }
      );
    });
  }
}
module.exports = InjectCDN;
