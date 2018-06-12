const should = require("should");
const StringUtils = require("../");

describe("stringCat", () => {
    it("should concatenate strings correctly", () => {
        let bigStringArray = Array(10000).fill("a".repeat(40));

        let s1 = StringUtils.stringCat(bigStringArray);
        let s2 = StringUtils.stringCatJson(bigStringArray);
        let truth = bigStringArray.join("\n");

        s1.should.be.eql(truth);
        s2.should.be.eql(truth);
    });
});
