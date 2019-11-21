const packageJson = require("./package.json");
module.exports = {
    src: [
      "./src/specs"
    ],
    mode: "file",
    theme: "./theme",
    includeDeclarations: false,
    tsconfig: "tsconfig.json",
    out: `./Documentation/v${packageJson.version}`,
    excludePrivate: true,
    excludeProtected: true,
    excludeExternals: true,
    excludeNotExported: true,
    readme: "CHANGELOG.md",
    name: `React Form Input Validation API's v${packageJson.version}`,
    ignoreCompilerErrors: true,
    plugin: "none",
    listInvalidSymbolLinks: true,
    hideGenerator: true,
    verbose: true
  };
