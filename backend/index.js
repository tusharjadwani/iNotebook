const express = require('express');
const connectToDb=require('./db');
const auth=require("./routes/auth");
const notes=require("./routes/notes");
var cors = require('cors')
const app = express();
app.use(cors())

app.use(express.json())

connectToDb();

app.get('/', (req, res) => {
    res.send('hiii');
    // console.log(req.socket.remoteAddress)
    // console.log(req.ip)
})
app.use('/api/auth',auth)
app.use('/api/notes',notes)

app.listen(5000, () => {
    console.log("server started at port 5000");
})