//@desc     Connection string to connect with mongoDB

const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const DBconn = async () => {
  const conn = await mongoose.connect(
    process.env.NODE_ENV === 'development'
      ? process.env.MONGO_URI
      : process.env.TEST_MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log(`Connection to MongoDB successful...DB: ${conn.connection.host}`);
};

module.exports = DBconn;
