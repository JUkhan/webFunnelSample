const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/invite/:token", (req, res) => {
  res.render("invite");
});
app.listen(4000, () => console.log("Listening on port 4000..."));
