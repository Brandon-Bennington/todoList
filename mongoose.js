const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const mongoDB = process.env.ATLAS_URI;
async function mongooseConnect() {
  try {
    await mongoose.connect(mongoDB, {dbName: process.env.MONGO_DATABASE}); 
  } catch (error) {
    throw error;
  }
}

module.exports = {
    mongooseConnect
};