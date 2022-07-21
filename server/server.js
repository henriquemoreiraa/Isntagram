const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const http = require('http');
const { Server } = require('socket.io');
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
    cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT'] }
});
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./database/connect');

app.use(cors());

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler)

app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/posts', require(''));

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on('send_message', (data) => {
        socket.broadcast.emit('received_message', data)
    })
})

serverHttp.listen(port, () => console.log(`Server started on port ${port}`));