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

server.listen(80, () => console.log("server running on port:" + 80));
