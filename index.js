// Imports
let express = require("express");
let app = express();
let typeCheck = require("type-check").typeCheck;
// Configurables
let port = 8080;
// App Properties
app.use(express.json());
//app.use(express.urlencoded({extended:true}));


// MAIN FUNCTION FOR THE PURPOSE OF THIS ASSIGNMENT
// POST request at /rate
app.post("/rate", (req, res, next) => {
    consoleLogNoTest("Received POST request at /rate");
    consoleLogNoTest(req.body);

    // SECTION - TYPE CHECKS
    if( !typeCheck("Number", req.body.length) ){
        res.status(400).send("Envelope length received is not numeric.");
        return;
    } else if( !typeCheck("String", req.body.length_unit)){
        res.status(400).send("Envelope unit for length received is not a string.");
        return;
    } else if( !typeCheck("Number", req.body.width) ){
        res.status(400).send("Envelope width received is not numeric.");
        return;
    } else if( !typeCheck("String", req.body.width_unit)){
        res.status(400).send("Envelope unit for width received is not a string.");
        return;
    } else if( !typeCheck("Number", req.body.weight) ){
        res.status(400).send("Envelope weight received is not numeric.");
        return;
    } else if( !typeCheck("String", req.body.weight_unit)){
        res.status(400).send("Envelope unit for weight received is not a string.");
        return;
    }
    
    // SECTION - UNIT VALUE CHECKS
    if( req.body.length_unit !== "mm" && req.body.length_unit !== "inch" ){
        res.status(400).send("Envelope unit for length is neither the accepted mm or inch.");
        return;
    } else if( req.body.width_unit !== "mm" && req.body.width_unit !== "inch" ){
        res.status(400).send("Envelope unit for width is neither the accepted mm or inch.");
        return;
    } else if( req.body.weight_unit !== "g" && req.body.weight_unit !== "oz" ){
        res.status(400).send("Envelope unit for weight is neither the accepted g or oz.");
        return;
    }

    // SECTION - UNIT CONVERSIONS
    let length_in_mm = req.body.length_unit === "mm" ? req.body.length : req.body.length*25.4;
    let width_in_mm = req.body.width_unit === "mm" ? req.body.width : req.body.width*25.4;
    let weight_in_g = req.body.weight_unit === "g" ? req.body.weight : req.body.weight*28.35;

    // SECTION - BOUNDARY CHECKS
    if( length_in_mm < 0 ){
        res.status(400).send("Envelope length received is not positive.");
        return;
    } else if (length_in_mm > 380){
        res.status(400).send("Envelope length received exceeds maximal 380 mm.");
        return;
    } else if( width_in_mm < 0 ){
        res.status(400).send("Envelope width received is not positive.");
        return;
    } else if (width_in_mm > 270){
        res.status(400).send("Envelope width received exceeds maximal 270 mm.");
        return;
    } else if( weight_in_g < 0 ){
        res.status(400).send("Envelope weight received is not positive.");
        return;
    } else if (weight_in_g > 500){
        res.status(400).send("Envelope weight received exceeds maximal 500 g.");
        return;
    }

    // SECTION - Price Calculation
    // If the package is overweight, rate is 2.40
    if( weight_in_g > 100 ){
        let rate = 2.40;
        res.status(200).json({rate});
        return;
    }
    // If the package's weight is outside [3,50] grams, it is nonstandard.
    if( weight_in_g < 3 || weight_in_g > 50 ){
        let rate = 0.98;
        res.status(200).json({rate});
        return;
    }
    // If the package's length is outside [140,245], it is nonstandard.
    if( length_in_mm < 140 || length_in_mm > 245 ){
        let rate = 0.98;
        res.status(200).json({rate});
        return;
    }
    // If the package's width is outside [90, 156], it is nonstandard.
    if( width_in_mm < 90 || width_in_mm > 156 ){
        let rate = 0.98;
        res.status(200).json({rate});
        return;
    }
    // The package must be standard from here on.
    // If the package's weight is in ]30,50], it is standard expensive.
    if( weight_in_g > 30 && weight_in_g <= 50 ){
        let rate = 0.80;
        res.status(200).json({rate});
        return;
    }
    // Otherwise, as the package's weight is below 30 grams, it is standard cheap.
    if( weight_in_g <= 30 ){
        let rate = 0.49;
        res.status(200).json({rate});
        return;
    }

    // SECTION - Reached All Filters
    // If logic reaches here, something hasn't been coded right.
    res.status(422).send("Failed to attribute rate to given envelope properties.");
    return;

});

// Test Control for what an error should look like
app.post("/example/error", (req, res, next) => {
    consoleLogNoTest("Received POST request at /example/error");
    consoleLogNoTest(req.body);
    res.status(400).send("Bad Request error.");
});

// Test Control for what a good response should look like
app.post("/example/good", (req, res, next) => {
    consoleLogNoTest("Received POST request at /example/good");
    consoleLogNoTest(req.body);
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