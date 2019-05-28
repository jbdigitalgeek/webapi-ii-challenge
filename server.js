const express = require('express');

const postRouter = require('./router');

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
    res.send('Server without Router')
    
});

module.exports = server;