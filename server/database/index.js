const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/noderest', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;

