/* tslint:disable */
var wasm;

const TextEncoder = require("util").TextEncoder;

let cachedEncoder = new TextEncoder("utf-8");

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (
        cachegetUint8Memory === null ||
        cachegetUint8Memory.buffer !== wasm.memory.buffer
    )
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    return cachegetUint8Memory;
}

function passStringToWasm(arg) {
    const buf = cachedEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

const TextDecoder = require("util").TextDecoder;

let cachedDecoder = new TextDecoder("utf-8");

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null)
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (
        cachegetUint32Memory === null ||
        cachegetUint32Memory.buffer !== wasm.memory.buffer
    )
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    return cachegetUint32Memory;
}

module.exports.string_cat_json = function(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    const retptr = globalArgumentPtr();
    wasm.string_cat_json(retptr, ptr0, len0);
    const mem = getUint32Memory();
    const ptr = mem[retptr / 4];
    const len = mem[retptr / 4 + 1];
    const realRet = getStringFromWasm(ptr, len).slice();
    wasm.__wbindgen_free(ptr, len * 1);
    return realRet;
};

module.exports.string_cat = function(arg0) {
    const ptr0 = arg0.ptr;
    arg0.ptr = 0;
    const retptr = globalArgumentPtr();
    wasm.string_cat(retptr, ptr0);
    const mem = getUint32Memory();
    const ptr = mem[retptr / 4];
    const len = mem[retptr / 4 + 1];
    const realRet = getStringFromWasm(ptr, len).slice();
    wasm.__wbindgen_free(ptr, len * 1);
    return realRet;
};

module.exports.string_split_json = function(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    const retptr = globalArgumentPtr();
    wasm.string_split_json(retptr, ptr0, len0);
    const mem = getUint32Memory();
    const ptr = mem[retptr / 4];
    const len = mem[retptr / 4 + 1];
    const realRet = getStringFromWasm(ptr, len).slice();
    wasm.__wbindgen_free(ptr, len * 1);
    return realRet;
};

module.exports.string_split = function(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    return StringVec.__construct(wasm.string_split(ptr0, len0));
};

class StringVec {
    static __construct(ptr) {
        return new StringVec(ptr);
    }

    constructor(ptr) {
        this.ptr = ptr;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        wasm.__wbg_stringvec_free(ptr);
    }
    static new() {
        return StringVec.__construct(wasm.stringvec_new());
    }
    push(arg0) {
        const [ptr0, len0] = passStringToWasm(arg0);
        return wasm.stringvec_push(this.ptr, ptr0, len0);
    }
    get_len() {
        return wasm.stringvec_get_len(this.ptr);
    }
    get_nth(arg0) {
        const retptr = globalArgumentPtr();
        wasm.stringvec_get_nth(retptr, this.ptr, arg0);
        const mem = getUint32Memory();
        const ptr = mem[retptr / 4];
        const len = mem[retptr / 4 + 1];
        const realRet = getStringFromWasm(ptr, len).slice();
        wasm.__wbindgen_free(ptr, len * 1);
        return realRet;
    }
    get_last() {
        const retptr = globalArgumentPtr();
        wasm.stringvec_get_last(retptr, this.ptr);
        const mem = getUint32Memory();
        const ptr = mem[retptr / 4];
        const len = mem[retptr / 4 + 1];
        const realRet = getStringFromWasm(ptr, len).slice();
        wasm.__wbindgen_free(ptr, len * 1);
        return realRet;
    }
}
module.exports.StringVec = StringVec;

module.exports.__wbindgen_throw = function(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
};

wasm = require("./string_utils_bg");
