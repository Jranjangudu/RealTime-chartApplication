const express = require("express");
const app = express();
const http = require("http").createServer(app);
const port = process.env.PORT || 5000;
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(port, () => {
  console.log(`server listening .. at ${port}`);
});

// socket

// now to create a server !!
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("new user connected ...");
  socket.on("msg", (msg) => {
    socket.broadcast.emit("message", msg);
  });
  socket.on("disconnected", () => {
    console.log("user disconnected");
  });
});
