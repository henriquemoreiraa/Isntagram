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
const path = require('path');
const User = require('./modules/userModule')
const ProfileImg = require('./modules/postImgModule')

app.use(cors());

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('files', express.static(path.resolve(__dirname, '..', 'client', 'public', 'test' )))
app.use(errorHandler);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

io.on('connection', (socket) => {
    socket.on('notification', (data) => {
        socket.join(data);
    });
    socket.on('notification_send', async data => {
        // const user = await User.findById(data.userId)
        // const userImg = await ProfileImg.findById(user.user_img)

        socket.to(data.id).emit('send_notification', {
            userName: data.userName,
            userImg: data.userImg
        });
    });
});


serverHttp.listen(port, () => console.log(`Server started on port ${port}`));
