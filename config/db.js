const mongoose = require('mongoose');

MONGO_URI =
  'mongodb+srv://username:password123!@cluster0.terwq.mongodb.net/userdetails?retryWrites=true&w=majority';

const DBconn = async () => {
  const conn = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Connection to MongoDB successful...DB: ${conn.connection.host}`);
};

module.exports = DBconn;
