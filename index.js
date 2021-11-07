// Imports
let express = require("express");
let app = express();
// Properties
let port = 8080;

// MAIN FUNCTION FOR THE PURPOSE OF THIS ASSIGNMENT
// POST request at /rate
app.post("/rate", (req, res, next) => {
    consoleLogNoTest("Received POST request at /rate");
    consoleLogNoTest(req.json);
    res.status(501).json("Function is to be implemented after tests are created.");
});

// Test Control for what an error should look like
app.post("/example/error", (req, res, next) => {
    consoleLogNoTest("Received POST request at /example/error");
    consoleLogNoTest(req.json);
    res.status(400).send("Bad Request error.");
});

// Test Control for what a good response should look like
app.post("/example/good", (req, res, next) => {
    consoleLogNoTest("Received POST request at /example/good");
    consoleLogNoTest(req.json);
    let rate = 0.49;
    res.status(200).json({rate});
});

// GET request at /about
app.get("/about", (req, res, next) => {
    res.json([
        "ECSE428",
        "FALL2021",
        "ASSIGNMENT B",
        "MCGILL",
        "ASSIGNMENT COMPLETED BY SOLELY EDWIN PAN"
    ])
});

app.listen(port, () => {
    console.log("Server running on port " + port)
});

// Helper Function: Log unless if testing
function consoleLogNoTest(string){
    if( process.env.NODE_ENV !== "test"){
        console.log(string);
    }
}

// For testing
module.exports = app;