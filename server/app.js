import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http';
import cors from 'cors';


const app = express();

const server = createServer(app);

const io = new Server(server,{
    cors:{
       origin:'*',
       methods:['GET','POST'],
       credentials:true
    }
});

app.use(cors(
    {
        origin:'*',
        methods:['GET','POST'],
        credentials:true
    }
));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on("message", (data) => {
        console.log(data);
       socket.broadcast.emit("message", data);
    });
   
}
)
server.listen(3000, () => {
    console.log(' app listening on port 3000!')
})




