var express = require("express");
var hbs = require("express-handlebars");
var db = require("./db/connection.js");

var app = express();
app.use("/assets", express.static("public"));
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname: ".hbs",
  partialsDir: "views/",
  layoutsDir: "views/",
  defaultLayout: "layout-main"
}));

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
  res.render("candidates-index", {
    candidates: db.candidates
  });
});

app.get("/candidates/:name", function(req, res){
  var desiredName = req.params.name.toLowerCase();
  var candidateOutput;
  db.candidates.forEach(function(candidate){
    if(desiredName === candidate.name.toLowerCase()){
      candidateOutput = candidate;
    }
  });
  res.render("candidates-show", {
    candidate: candidateOutput
  });
});

app.listen(3001, function(){
  console.log("yo");
});
