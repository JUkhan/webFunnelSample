const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/getInvitationInfo/:token", (req, res) => {
  console.log(req.params.token);
  //token should be a uuid based on inviter(user)
  //this is a ad-hoc implementation for test only
  let data = {};
  if (req.params.token.includes("group")) {
    data.title1 =
      "Help AXO donate $5,000 to St. Jude by joining them on kickit";
    data.title2 = "kick it with AXO on our friend map";
    data.category = "group";
  } else if (req.params.token.includes("referral")) {
    data.title1 = "John is inviting you to join kickit";
    data.title2 = "Checkout John's upcoming plans on the kickit app!";
    data.location = { lat: 23.8103, lng: 90.4125 };
    data.image = "https://via.placeholder.com/50/24f355";
    data.category = "referral";
  } else if (req.params.token.includes("event")) {
    data.title1 = 'You\'ve been invited to "Pregame"';
    data.address = "address";
    data.date = "date and time";
    data.images = ["img1", "img2"];
    data.title2 = "checkout when a,b,c are ariving to the event";
    data.category = "event";
  }
  res.send(data);
});

app.post("/savePhoneNumber", function(req, res) {
  console.log(req.body);
  res.send({ msg: "save successfully" });
});

app.listen(3000, () => console.log("Listening on port 3000..."));
