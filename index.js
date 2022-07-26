const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const DBConn = require('./config/db');

dotenv.config({ path: './config/config.env' });
DBConn();
const app = express();

const userdetails = require('./routes/users');

app.use(express.json());
app.use('/api/v1/users', userdetails);

const PORT = 5000;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

module.exports = server;
