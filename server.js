// init project
var cors = require("cors");
const moment = require("moment");
var express = require("express");
var app = express();

app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:date_string?", function(req, res) {
  dateString = req.params.date_string;

  if (dateString == undefined) {
    var date = new Date();
    var unixdate = date.getTime();
    var utcdate = date.toUTCString();
  } else if (moment(dateString).isValid()) {
    var date = new Date(dateString);
    var unixdate = date.getTime();
    var utcdate = date.toUTCString();
  } else if (!isNaN(parseFloat(dateString)) && isFinite(dateString)) {
    var date = new Date(parseInt(dateString)*1000);
    var unixdate = dateString;
    utcdate = date.toUTCString();
  } else {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: unixdate, utc: utcdate });
});

// listen for requests :)
const port = process.env.PORT || 3000;
var listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
