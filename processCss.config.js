const path = require("node:path");
const browserslist = require("browserslist");
const { bundle, browserslistToTargets, Features } = require("lightningcss");

/** @param {import('@11ty/eleventy').UserConfig} config */
module.exports = function (config) {
  config.addTemplateFormats("css");
  config.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (_inputContent, inputPath) {
      if (inputPath !== "./src/content/style/index.css") {
        return;
      }
      let targets = browserslistToTargets(browserslist("> 0.2% and not dead"));

      return async () => {
        let { code } = await bundle({
          filename: inputPath,
          minify: true,
          sourceMap: false,
          targets,
          drafts: {
            nesting: true,
          },
        });
        return code;
      };
    },
  });
};
