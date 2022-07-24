const express = require('express');
const DBConn = require('./config/db');

const app = express();
DBConn();

const userdetails = require('./routes/users');

app.use(express.json());
app.use('/api/v1/users', userdetails);

const PORT = 5000;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));
