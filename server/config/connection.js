const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/art-club', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

/*
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://trip6love:Homer123@cluster0.refbv.mongodb.net/artclub?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
*/
module.exports = mongoose.connection;