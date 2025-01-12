const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()
const UserAPI = require("./controllers/user");
const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

app.use("/api/v1", UserAPI);

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('Server start to port:', PORT)
    })
}

server()