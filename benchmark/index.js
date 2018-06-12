const StringUtils = require("../wasm-api");
const Benchmark = require("benchmark");
const benchmarkOptions = {
    onCycle: function() {
        process.stderr.write(".");
    },
    minSamples: 10
};

const StringLens = [20];
const StringNums = [10000, 100000, 1000000];
const suite = new Benchmark.Suite();

StringLens.forEach(len => {
    StringNums.forEach(num => {
        let bigString = ("a".repeat(len) + "\n").repeat(num);
        suite.add(
            `StringSplit(JSON): Len: ${len}, Num: ${num}`,
            () => {
                let x = StringUtils.stringSplitJson(bigString);
            },
            benchmarkOptions
        );
    });
});

StringLens.forEach(len => {
    StringNums.forEach(num => {
        let bigString = ("a".repeat(len) + "\n").repeat(num);
        suite.add(
            `StringSplit(Intermediate Object): Len: ${len}, Num: ${num}`,
            () => {
                let x = StringUtils.stringSplit(bigString);
            },
            benchmarkOptions
        );
    });
});

StringLens.forEach(len => {
    StringNums.forEach(num => {
        let bigStringArray = Array(num).fill("a".repeat(len));
        suite.add(
            `StringCat(JSON): Len: ${len}, Num: ${num}`,
            () => {
                let x = StringUtils.stringCatJson(bigStringArray);
            },
            benchmarkOptions
        );
    });
});

StringLens.forEach(len => {
    StringNums.forEach(num => {
        let bigStringArray = Array(num).fill("a".repeat(len));
        suite.add(
            `StringCat(Intermediate Object): Len: ${len}, Num: ${num}`,
            () => {
                let x = StringUtils.stringCat(bigStringArray);
            },
            benchmarkOptions
        );
    });
});

suite.on("cycle", event => {
    process.stderr.write("\n");
    const b = event.target;
    console.log(
        b.name +
            "\t" +
            Math.floor(1000 * b.stats.mean) +
            "\t" +
            Math.floor(1000 * (b.stats.mean - b.stats.moe)) +
            "\t" +
            Math.floor(1000 * (b.stats.mean + b.stats.moe))
    );
});

suite.run({
    async: true
});
