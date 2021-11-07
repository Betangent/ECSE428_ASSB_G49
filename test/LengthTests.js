process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../index.js");
let should = chai.should();

chai.use(chaiHttp);

// Test Template for Length Tests
function testRateWithVaryingLengths(l, l_u, rstatus, rrate = null){
    let envelopeProperties = {
        length : l, 
        length_unit : l_u,
        width: 125,
        width_unit: "mm",
        weight: 15,
        weight_unit: "g"
    };
    chai.request(server)
    .post("/rate")
    .send(envelopeProperties)
    .end((err,res) => {
        // Assert status
        res.should.have.status(rstatus)
        // Assert rate, if needed
        if(rrate !== null){
            res.body.should.have.property("rate").equal(rrate);
        }
        // Indicate test is complete
        done();
    });
}

// Test Parent Block
describe("Test /rate POST, varying sent length properties", () =>{

    describe("POST /rate with -1 mm length ", () =>{
        it("it should yield a Bad Request response status", (done) => {
            testRateWithVaryingLengths(-1,"mm",400)
        });
    });

});