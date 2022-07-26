//@desc     Connection string to connect with mongoDB

const mongoose = require('mongoose');

const DBconn = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Connection to MongoDB successful...DB: ${conn.connection.host}`);
};

module.exports = DBconn;