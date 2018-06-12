# wasm-string-array-benchmark

## Passing string array to WebAssembly
Sample function: `stringCat`   
String lentgh: 20

| Method\Number of strings | 10000 | 100000 | 1000000 |
| ------------------------ | ----- | ------ | ------- |
| JSON string              | 2ms     | 21ms     | 258ms   |
| Intermediate Object (wasm-bindgen) | 8ms | 84ms | 887ms |
| Array of [ptr, len] (wasm-bindgen/raw) |  | | |

## Returning string array from WebAssembly
Sample function: `stringSplit`   
String lentgh: 20

| Method\Number of strings | 10000 | 100000 | 1000000 |
| ------------------------ | ----- | ------ | ------- |
| JSON string              | 8ms     | 114ms     | 1161ms    |
| Intermediate Object (wasm-bindgen) | 16ms | 168ms | 1814ms |
| Array of [ptr, len] (wasm-bindgen/raw) |  | | |
