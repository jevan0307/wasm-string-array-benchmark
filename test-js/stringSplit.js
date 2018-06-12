const should = require("should");
const StringUtils = require("../");

describe("stringSplit", () => {
    it("should split string correctly", () => {
        let bigString = ("a".repeat(10000) + "\n").repeat(40);

        let splitted2 = StringUtils.stringSplit(bigString);
        let splitted1 = StringUtils.stringSplitJson(bigString);
        let truth = bigString.split("\n");

        splitted1.should.be.eql(truth);
        splitted2.should.be.eql(truth);
    });
});
