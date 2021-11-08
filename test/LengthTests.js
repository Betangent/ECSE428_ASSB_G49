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

    // Out of bounds: negative mm is not possible
    loggedTest_RateByLengths(-1,"mm","Bad request response status",400);
    // Non-standard envelope sizes in mm
    loggedTest_RateByLengths(0,"mm","OK response status", 200, 0.98);
    loggedTest_RateByLengths(1,"mm","OK response status", 200, 0.98);
    loggedTest_RateByLengths(139,"mm","OK response status", 200, 0.98);
    // Standard envelope sizes in mm
    loggedTest_RateByLengths(140,"mm","OK response status", 200, 0.49);
    loggedTest_RateByLengths(141,"mm","OK response status", 200, 0.49);
    loggedTest_RateByLengths(244,"mm","OK response status", 200, 0.49);
    loggedTest_RateByLengths(245,"mm","OK response status", 200, 0.49);
    // Non-standard envelope sizes in mm
    loggedTest_RateByLengths(246,"mm","OK response status", 200, 0.98);
    loggedTest_RateByLengths(379,"mm","OK response status", 200, 0.98);
    loggedTest_RateByLengths(380,"mm","OK response status", 200, 0.98);
    // Out of bounds: oversized envelope: we assume 380mm is limit.
    loggedTest_RateByLengths(381,"mm","Bad request response status", 400);
    // Out of bounds: negative inches in possible
    loggedTest_RateByLengths(-1,"inch","Bad request response status", 400);
    // Non-standard envelope sizes in inches
    loggedTest_RateByLengths(0,"inch","OK response status", 200, 0.98);
    loggedTest_RateByLengths(1,"inch","OK response status", 200, 0.98);
    // Standard envelope size in inches
    loggedTest_RateByLengths(7.875,"inch","OK response status", 200, 0.49);
    // Non-standard envelope sizes in inches
    loggedTest_RateByLengths(12,"inch","OK response status", 200, 0.98);
    // Out of bounds: oversized envelope: we assume 380mm is limit.
    loggedTest_RateByLengths(16,"inch","Bad request response status", 400);
    // Bad payload: invalid unit of length
    loggedTest_RateByLengths(0,"asdf","Bad request response status", 400);
    // Bad Payload: non-integer length
    loggedTest_RateByLengths("asdf","inch","Bad request response status", 400);

});