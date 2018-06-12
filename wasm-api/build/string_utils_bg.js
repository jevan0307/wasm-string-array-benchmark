let imports = {};
imports["./string_utils"] = require("./string_utils");

const join = require("path").join;
const bytes = require("fs").readFileSync(
    join(__dirname, "string_utils_bg.wasm")
);
const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
module.exports = wasmInstance.exports;
