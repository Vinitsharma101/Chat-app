const express = require('express');
const app = express();
const http = require('http');
const cors = require("cors");

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: 'http://localhost:8081'
}));

app.get('/', (req, res) => {
  res.send('Server is running');
});

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on("message", (data) => {
    console.log('Received message:', data);
    socket.broadcast.emit("message", data); 
   });


  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});