const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

app.set("views", path.join(__dirname, "/resources/views"));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static("public"))


app.get("/", (req, res) => {
  res.render("home");
});
app.get("/cart",(req,res)=>{
  res.render("customers/cart")

})
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
