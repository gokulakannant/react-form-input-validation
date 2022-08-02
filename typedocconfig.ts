const packageJson = require("./package.json");
module.exports = {
    entryPoints: [
      "./src/specs/react-form-input-validator.spec.ts",
      "./src/hooks/useFormInputValidation.ts"
    ],
    tsconfig: "tsconfig.json",
    out: `./Documentation/v${packageJson.version}`,
    excludePrivate: true,
    excludeProtected: true,
    excludeExternals: true,
    readme: "CHANGELOG.md",
    name: `React Form Input Validation API's v${packageJson.version}`,
    plugin: "none",
    hideGenerator: true,
    logLevel: "Verbose"
  };
