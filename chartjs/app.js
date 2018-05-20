const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const hbs = require("hbs");

app.set("view engine", "hbs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", socket => {
  socket.on("upvote", incvalue => {
    io.emit("upvote", incvalue);
  });
});

http.listen(8080, () => {
  console.log("Server is running on 8080");
});
