import express from "express";
import http from "http";
import path from "path"; // Import path module
import { fileURLToPath } from "url"; // Import fileURLToPath from url module
import {Server} from "socket.io";


// Manually create __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app= express();
const server=http.createServer(app);

app.use(express.static('public'));



app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname ,'index.html'));
})
server.listen(3000,()=>{
console.log("listening at port 3000");
});





//socket
const io=new Server(server);
io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})
