#![feature(proc_macro, wasm_custom_section, wasm_import_module)]

extern crate wasm_bindgen;
#[macro_use]
extern crate serde_json;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn string_cat_json(strs_json: String) -> String {
    let strs: Vec<&str> = serde_json::from_str(&strs_json).unwrap();
    strs.join("\n")
}

#[wasm_bindgen]
pub fn string_cat(strs: StringVec) -> String {
    let strs = strs.get_raw();
    strs.join("\n")
}

#[wasm_bindgen]
pub fn string_split_json(s: String) -> String {
    let splitted: Vec<&str> = s.split('\n').collect();
    serde_json::to_string(&splitted).unwrap()
}

#[wasm_bindgen]
pub fn string_split(s: String) -> StringVec {
    let mut svec = StringVec::new();
    for i in s.split('\n') {
        svec.push(String::from(i));
    }
    svec
}

#[wasm_bindgen]
pub struct StringVec {
    val: Vec<String>,
}

#[wasm_bindgen]
impl StringVec {
    pub fn new() -> StringVec {
        StringVec { val: Vec::new() }
    }

    pub fn push(&mut self, s: String) {
        self.val.push(s);
    }

    pub fn get_len(&self) -> i32 {
        self.val.len() as i32
    }

    pub fn get_nth(&mut self, i: i32) -> String {
        self.val.get(i as usize).unwrap().clone()
    }
}

impl StringVec {
    pub fn get_raw(self) -> Vec<String> {
        self.val
    }
}
