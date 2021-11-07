process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../index.js");
let should = chai.should();

chai.use(chaiHttp);
// Test Parent Block
describe("Test on POST request on /rate focusing on length properties", () =>{

    describe("POST /rate with -1 mm length ", () =>{
        it("it should yield a Bad Request response status", (done) => {
            let envelopeProperties = {
                length: -1,
                length_unit: "mm",
                width: 125,
                width_unit: "mm",
                weight: 15,
                weight_unit: "g"
            }
            chai.request(server)
            .post("/rate")
            .send(envelopeProperties)
            .end((err,res) => {
                res.should.have.status(400);
            });

        });
    });

});