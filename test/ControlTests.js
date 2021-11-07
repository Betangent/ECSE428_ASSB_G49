process.env.NODE_ENV = 'test';

//Test file for practising test code on the about page

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../index.js");
let should = chai.should();

chai.use(chaiHttp);
// Test Parent Block
describe("Helper Tests: Test test examples", () =>{

    // Test Test Control for what an error response should look like
    describe("POST /example/error", () =>{
        it("it should yield an error 400 response", (done) => {
            chai.request(server)
            .post("/example/error")
            .end((err,res) => {
                res.should.have.status(400);
                done();
            });
        });
    });

    // Test Test Control for what a good response should look like
    describe("POST /example/good", () => {
        it("it should yield a response 200 with simple rate json", (done) =>{
            chai.request(server)
            .post("/example/good")
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.property("rate").equal(0.49);
                done();
            });
        });
    });

});