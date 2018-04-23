'use strict';
let path = require('path');
const express = require('express');
const logger = require('./tools/logger');

let app = express();

// server static files
app.use(express.static(path.join(__dirname, 'build')));

// route all requests to index
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = 5002;

// start listening
logger.status(`starting spplication server on port ${port}`);
app.listen(port,()=>{
    logger.status(`app started on  ${port}`);
});
