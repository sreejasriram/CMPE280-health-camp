const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: { type: String, required: false },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    image: { type: String, required: false },
    medics: { type: String, required: false },
    notes: { type: String, required: false }
  }, { collection: 'user' });


const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;