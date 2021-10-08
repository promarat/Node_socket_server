let express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { get_Current_User, user_Disconnect, join_User } = require("./dummyuser");
// const port = 3000;
const ct_users = [];

//initializing the socket io connection 
io.on("connection", (socket) => {

  socket.on("login", ({ uid, email }) => {
    //* create user
    ct_users.push({id:socket.id, user_id: uid, user_email: email});
    console.log(ct_users, "User List");
    //broad cast self available signal to someones was accepted
  });

  socket.on("sendmessage", ({receiver_id, message_text}) => {
    //* create user
    // ct_users.push({id:socket.id, user_id: uid, user_email: email});
    const selfIndex = ct_users.findIndex((e_user) => e_user.id === socket.id);
    console.log('Sender', ct_users[selfIndex]);
    socket.emit("message", {
      sender: {id:ct_users[selfIndex].user_id},
      createdAt: new Date().toString(),
      message: message_text,
    });
    const index = ct_users.findIndex((e_user) => e_user.user_id === receiver_id);
    if(index != -1){
      console.log('Receiver', ct_users[index]);
      io.to(ct_users[index].id).emit("message", {
        sender: {id:ct_users[selfIndex].user_id},
        createdAt: new Date().toString(),
        message: message_text,
      });
    }
    
    //broad cast self available signal to someones was accepted
  });

    //for a new user joining the room
    // socket.on("joinRoom", ({ username, roomname }) => {
    //   //* create user
    //   const p_user = join_User(socket.id, username, roomname);
    //   console.log(socket.id, "=id");
    //   socket.join(p_user.room);
  
    //   //display a welcome message to the user who have joined a room
    //   socket.emit("message", {
    //     userId: p_user.id,
    //     username: p_user.username,
    //     text: `Welcome ${p_user.username}`,
    //   });
  
    //   //displays a joined room message to all other room users except that particular user
    //   socket.broadcast.to(p_user.room).emit("message", {
    //     userId: p_user.id,
    //     username: p_user.username,
    //     text: `${p_user.username} has joined the chat`,
    //   });
    // });
  
    //user sending message
    socket.on("chat", (text) => {
      //gets the room user and the message sent
      const p_user = get_Current_User(socket.id);
  
      io.to(p_user.room).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: text,
      });
    });
  
    //when the user exits the server
    socket.on("disconnect", () => {
      //the user is deleted from array of users and a left room message displayed
      const index = ct_users.findIndex((e_user) => e_user.id === socket.id);

      if (index !== -1) {
        ct_users.splice(index, 1)[0];
      }
      console.log(ct_users);
    });
  });
const PORT = process.env.PORT || 7131;
server.listen(PORT, err => {
    if(err) throw err;
    console.log("Server running: PORT:" + PORT);
});