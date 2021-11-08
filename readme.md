# McGill ECSE 428 Fall 2021 Assignment B Group 49 Repository

Submission for Group 49's Rest API Postal Rate Calculator.

## Team Members

The team comprises of a sole student completing the assignment on their own because they failed to find a teammate.
Team thus comprises:
- Edwin Pan, 260843175

## Overview

### API

The project comprises a very simple express.js backend which returns a postal rate via json `{rate: NUMERIC_OUTPUT}` when given a POST request in URI /rate with a sent body comprising of json in format `{length: NUM, length_unit: STR, width: NUM, width_unit: STR, weight: NUM, width_unit: STR}`.

The server responds to post requests in URI `/example/error` and `/example/good` though these are not meant for end use and were created in order to allow me to figure out how to write test code - the test code of which is found in the tests folder of the project as ControlTests.js.

### Running the Application

The server is ran via the command `npm run start:dev`. This creates a localhost server open on port 8080. There is no production build of this server at this time.

### Testing the Application

The tests for this project are ran via the command `npm test`, which runs tests under the Mocha and Chai framework.

### Test Design

In the test folder of this project you will find an excel document named `TestConditions.xlsx` which defines on the first sheet the domain of values for each dimension of an envelope that must be tested followed by a second sheet which defines the exact tests parametres under which the API will be tested. The project 68 tests on the /rate URI, though it also has two extra tests which were used by the developer to validate the design oftheir tests. These 68 tests are contained by the LengthTests.js, WidthTests.js, and WeightTests.js files which were created before the business logic was implemented on the /rate API.

### Documentation

As this assignment requires that we document the purpose of our tests, that the tests fail, that code was added, and that failed tests now pass and previous tests still pass with the addition of code, screenshots demonstrating improving test results with the addition of code are in this project's /doc directory as PNG files. They are named in order.
