let express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { get_Current_User, user_Disconnect, join_User } = require("./dummyuser");
// const port = 3000;
const ct_users = [];
const users_byid = [];
const rooms_byid = [];

//initializing the socket io connection 
io.on("connection", (socket) => {
  console.log("connection on");
  socket.on("newVoice", ({ uid }) => {
    //* create user
    console.log(uid, "User List");
    //broad cast self available signal to someones was accepted
    socket.broadcast.emit("notice_Voice", {id:socket.id, user_id: uid});
  });
  
  // socket.on("login", ({ uid, email }) => {
  //   //* create user
  //   const selfIndex = ct_users.findIndex((e_user) => e_user.id === socket.id);
  //   if(selfIndex != -1){
  //     ct_users[selfIndex] = {id:socket.id, user_id: uid, user_email: email};
  //   } else {
  //     ct_users.push({id:socket.id, user_id: uid, user_email: email});
  //   }
  //   users_byid[uid] = {id:socket.id, user_id: uid, user_email: email};
  //   console.log(ct_users, "User List");
  //   //broad cast self available signal to someones was accepted
  //   socket.broadcast.emit("joined", {id:socket.id, user_id: uid, user_email: email});
  // });

  // socket.on("getjoinedusers", () => {
  //   console.log('getjoinedusers', users_byid);
  //   socket.emit("joinedusers", users_byid);
  // });

  // socket.on("sendmessage", ({receiver_id, message_text}) => {
  //   //* create user
  //   // ct_users.push({id:socket.id, user_id: uid, user_email: email});
  //   const selfIndex = ct_users.findIndex((e_user) => e_user.id === socket.id);
  //   console.log('Sender', ct_users[selfIndex]);
  //   socket.emit("message", {
  //     sender: {id:ct_users[selfIndex].user_id},
  //     createdAt: new Date().toString(),
  //     message: message_text,
  //   });
  //   const index = ct_users.findIndex((e_user) => e_user.user_id === receiver_id);
  //   if(users_byid[receiver_id]){
  //     console.log('Receiver', ct_users[index]);
  //     io.to(users_byid[receiver_id].id).emit("message", {
  //       sender: {id:ct_users[selfIndex].user_id},
  //       createdAt: new Date().toString(),
  //       message: message_text,
  //     });
  //   }

  //   socket.emit("here", {aa:ct_users, bb:users_byid});
    
  //   //broad cast self available signal to someones was accepted
  // });

  // socket.on("gethisonline", (him) => {
  //   const selfIndex = ct_users.findIndex((e_user) => e_user.id === socket.id);
  //   socket.emit("hisonline", users_byid[him] ? true : false);
  //   if (users_byid[him]) {
  //     rooms_byid[ct_users[selfIndex].user_id] = him;
  //   }
  // });

  // socket.on("istyping", (him) => {
  //   console.log(him, 'him');
  //   const index = ct_users.findIndex((e_user) => e_user.user_id === him);
  //   if (users_byid[him]){
  //     console.log(ct_users[index], 'lalalal', users_byid);
  //     io.to(users_byid[him].id).emit("istyping", true);
  //   }
  // });


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
    // socket.on("chat", (text) => {
    //   //gets the room user and the message sent
    //   const p_user = get_Current_User(socket.id);
  
    //   io.to(p_user.room).emit("message", {
    //     userId: p_user.id,
    //     username: p_user.username,
    //     text: text,
    //   });
    // });
  
    //when the user exits the server
    // socket.on("disconnect", () => {
    //   //the user is deleted from array of users and a left room message displayed
    //   const index = ct_users.findIndex((e_user) => e_user.id === socket.id);

    //   if (index !== -1) {
    //     socket.broadcast.emit("outed", ct_users[index]);
    //     users_byid.splice(ct_users[index].user_id, 1);
    //     ct_users.splice(index, 1);
    //   }
    //   console.log(ct_users, 'disconnected');
    // });
  });
const PORT = process.env.PORT || 21;
server.listen(PORT, err => {
    if(err) throw err;
    console.log("Server running: PORT:" + PORT);
});