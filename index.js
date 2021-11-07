// Imports
let express = require("express");
let app = express();
// Properties
let port = 8080;

// MAIN FUNCTION FOR THE PURPOSE OF THIS ASSIGNMENT
// POST request at /rate
app.post("/rate", (req, res, next) => {
    console.log("Received POST request at /rate");
    console.log(req.json);
    res.status(501).json("Function is to be implemented after tests are created.");
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
    console.log("Server running on port 3000")
});

// For testing
module.exports = app;