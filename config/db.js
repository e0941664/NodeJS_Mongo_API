const mongoose = require('mongoose');

MONGO_URI =
  'mongodb+srv://user:pass123!@nodemongoapi.pqu6a.mongodb.net/userdetails?retryWrites=true&w=majority';

const DBconn = async () => {
  const conn = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  console.log(`Connection to MongoDB successful...DB: ${conn.connection.host}`);
};

module.exports = DBconn;