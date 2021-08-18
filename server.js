let express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
// const port = 3000;

io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on("socket_follow_user", msg => {
        console.log(msg);
        io.emit("socket_follow_user", msg);
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, err => {
    if(err) throw err;
    console.log("Server running");
});