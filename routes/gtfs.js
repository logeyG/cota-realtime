var express = require('express');
var router = express.Router();

var Converter = require("csvtojson").Converter;
var fs = require("fs");

var shapes = [];

function getShapes() {

    var csvFileName = "./OpenGTFSData/shapes_43972.txt";
    var csvConverter = new Converter({});

    csvConverter.on("end_parsed", function(jsonObj) {
        shapes = jsonObj;
    });

    fs.createReadStream(csvFileName).pipe(csvConverter);
}

router.get('/shapes', function(req, res, next) {

    getShapes();
    res.send(shapes);
});

module.exports = router;