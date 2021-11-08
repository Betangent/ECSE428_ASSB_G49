process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../index.js");
let should = chai.should();

chai.use(chaiHttp);

// Test Template for Length Tests - Chai and JSON level
function test_RateByLengths(l, l_u, done, rstatus, rrate = null){
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

// Test Template for Length Tests - Mocha level
function loggedTest_RateByLengths(len, len_unit, desc_expectedRes, resStatus, resRate = null){
    describe("POST /rate with " + len + " " + len_unit, () => {
        let description = "it should yield a " + desc_expectedRes;
        if(resRate !== null){
            description = description + " with rate at " + resRate;
        }
        it(description, (done) => {
            test_RateByLengths(len,len_unit,done,resStatus,resRate)
        });
    });
}

// Mocha Test Parent for all tests in this file
describe("Test /rate POST, varying sent length properties", () =>{

    loggedTest_RateByLengths(-1,"mm","Bad request response status",400);

});