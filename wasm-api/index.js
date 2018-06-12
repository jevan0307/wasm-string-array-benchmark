var wasm = require("./build/string_utils");

function toStringVec(arr) {
    let svec = wasm.StringVec.new();
    arr.forEach(s => {
        if (typeof s === "string") {
            svec.push(s);
        }
    });
    return svec;
}

function fromStringVec(svec) {
    let ret = [];
    let len = svec.get_len();
    for (let i = 0; i < len; i++) {
        ret.push(svec.get_nth(i));
    }
    svec.free();
    return ret;
}

exports.stringSplit = function stringSplit(s) {
    return fromStringVec(wasm.string_split(s));
};

exports.stringSplitJson = function stringSplitJson(s) {
    return JSON.parse(wasm.string_split_json(s));
};

exports.stringCat = function stringCat(strs) {
    return wasm.string_cat(toStringVec(strs));
};

exports.stringCatJson = function stringCatJson(strs) {
    return wasm.string_cat_json(JSON.stringify(strs));
};
