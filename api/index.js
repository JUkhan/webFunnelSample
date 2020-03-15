const express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

app.get("/getTitles/:token", (req, res) => {
  console.log(req.params.token);
  let data = {
    title1: "title1",
    title2: "title2",
    buttonText: "Download"
  };
  res.send(data);
});

app.listen(3000, () => console.log("Listening on port 3000..."));
