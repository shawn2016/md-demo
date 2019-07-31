"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use("/docs/examples/umd", express.static(__dirname + "/docs/examples/umd"));
app.use("/track/track.gif", express.static(__dirname));

app.use(express.static(__dirname));

app.get("/", function(req, res) {
  res.redirect(301, "/docs/");
});

app.get("/track", function(req, res) {
  //console.log('track: ' +JSON.stringify(req.query));
  console.log(
    "track: data" +
      new Buffer(JSON.stringify(req.query.data), "base64").toString()
  );
  console.log(
    "=================================================================================="
  );
  res.send(new Buffer(JSON.stringify(req.query.data), "base64").toString());
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var server = app.listen(3300, function() {
  console.log("11 test app listening on port %s", server.address().port);
});
