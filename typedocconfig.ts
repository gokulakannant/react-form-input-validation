const packageJson = require("./package.json");
module.exports = {
    src: [
      "./src/specs"
    ],
    mode: "file",
    theme: "./theme",
    includeDeclarations: false,
    tsconfig: "tsconfig.json",
    out: `./Documentation/${packageJson.version}`,
    excludePrivate: true,
    excludeProtected: false,
    excludeExternals: true,
    excludeNotExported: false,
    readme: "README.md",
    name: `React Input Form Validation`,
    ignoreCompilerErrors: true,
    plugin: "none",
    listInvalidSymbolLinks: true,
    hideGenerator: true,
    verbose: true
  };
