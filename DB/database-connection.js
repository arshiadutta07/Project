require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI;

//Creating Connection with our Mongo Server
mongoose.connect(connectionString);
const db = mongoose.connection;
db.on('error', function(err) {
    console.log("Connection with MongoDB Failed", err);
});
db.once('open', function() {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;
