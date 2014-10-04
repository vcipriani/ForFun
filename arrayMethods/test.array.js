

var expect = chai.expect;

var testA = [1,2,3];
var userEntered = [];

describe("Filter", function() {
    it("Equals native filter w/ simple array", function() {
        expect(testA.filter2(even)).to.deep.equal(testA.filter(even));
    });
    
    it("Equals native filter w/ user entered array", function() {
        expect(userEntered.filter2(even)).to.deep.equal(userEntered.filter(even));
    });
});

describe("Map", function() {
    it("Equals native map  w/ simple array", function() {
        expect(testA.map2(x2)).to.deep.equal(testA.map(x2));
    });
    
    it("Equals native map w/ user entered array", function() {
        expect(userEntered.filter2(even)).to.deep.equal(userEntered.filter(even));
    });
});

describe("Reduce", function() {
    it("Equals native reduce  w/ simple array", function() {
        expect(testA.reduce2(sum)).to.deep.equal(testA.reduce(sum));
    });
    
    it("Equals native reduce w/ user entered array", function() {
        expect(userEntered.filter2(even)).to.deep.equal(userEntered.filter(even));
    });
});


