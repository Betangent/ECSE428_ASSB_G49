process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../index.js");
let should = chai.should();

chai.use(chaiHttp);

// Test Template for Weight Tests - Chai and JSON level
function test_RateByWeights(w, w_u, done, rstatus, rrate = null){
    let envelopeProperties = {
        length : 200, 
        length_unit : "mm",
        width: 125,
        width_unit: "mm",
        weight: w,
        weight_unit: w_u
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

// Test Template for Weight Tests - Mocha level
function loggedTest_RateByWeights(weight, weight_unit, desc_expectedRes, resStatus, resRate = null){
    describe("POST /rate with " + weight + " " + weight_unit + " weight", () => {
        let description = "it should yield a " + desc_expectedRes;
        if(resRate !== null){
            description = description + " with rate at " + resRate;
        }
        it(description, (done) => {
            test_RateByWeights(weight,weight_unit,done,resStatus,resRate)
        });
    });
}

// Mocha Test Parent for all tests in this file
describe("Test /rate POST, varying sent weight properties", () =>{

    // Out of bounds: negative weight is not possible in oz
    loggedTest_RateByWeights(-1,"g","Bad request response status",400);
    // Standard dimensions, non-standard non-heavy weights in g
    loggedTest_RateByWeights(0,"g","OK response status", 200, 0.);
    loggedTest_RateByWeights(1,"g","OK response status", 200, 0.);
    loggedTest_RateByWeights(2,"g","OK response status", 200, 0.);
    // Standard dimensions, standard non-heavy weights in g
    loggedTest_RateByWeights(3,"g","OK response status", 200, 0.);
    loggedTest_RateByWeights(4,"g","OK response status", 200, 0.);
    loggedTest_RateByWeights(29,"g","OK response status", 200, 0.);
    loggedTest_RateByWeights(30,"g","OK response status", 200, 0.);
    // Standard dimensions, standard heavier weights in g
    loggedTest_RateByWeights(31,"g","OK response status", 200, 0.);
    loggedTest_RateByWeights(49,"g","OK response status", 200, 0.);
    loggedTest_RateByWeights(50,"g","OK response status", 200, 0.);
    // Standard dimensions, non-standard non-heavy weights in g
    loggedTest_RateByWeights(51,"g","OK response status", 200, 0.);
    loggedTest_RateByWeights(99,"g","OK response status", 200, 0.);
    loggedTest_RateByWeights(100,"g","OK response status", 200, 0.);
    // Standard dimensions, non-standard heavy weights in g
    loggedTest_RateByWeights(101,"g","OK response status", 200, 0.);
    loggedTest_RateByWeights(499,"g","OK response status", 200, 0.);
    loggedTest_RateByWeights(500,"g","OK response status", 200, 0.);
    // Out of bounds: weight above 500 g in oz
    loggedTest_RateByWeights(501,"oz","Bad request response status",400);
    // Out of bounds: negative weight it not possible in oz
    loggedTest_RateByWeights(-1,"oz","Bad request response status",400);
    // Standard dimensions, non-standard non-heavy weights in oz
    loggedTest_RateByWeights(0,"oz","OK response status", 200, 0.);
    // Standard dimensions, standard non-heavy weights in oz
    loggedTest_RateByWeights(0.5,"oz","OK response status", 200, 0.);
    loggedTest_RateByWeights(1,"oz","OK response status", 200, 0.);
    // Standard dimensions, standard heavier weights in oz
    loggedTest_RateByWeights(1.5,"oz","OK response status", 200, 0.);
    // Standard dimensions, non-standard non-heavy weights in oz
    loggedTest_RateByWeights(2.5,"oz","OK response status", 200, 0.);
    // Standard dimensions, non-standard heavy weights in oz
    loggedTest_RateByWeights(9,"oz","OK response status", 200, 0.);
    // Out of bounds: weight above 500 g in oz
    loggedTest_RateByWeights(20,"oz","Bad request response status",400);
    // Bad payload: invalid unit of weight measurement
    loggedTest_RateByWeights(1,"asdf","Bad request response status",400);
    // Bad payload: non-numeric weight
    loggedTest_RateByWeights("asdf","g","Bad request response status",400);

});