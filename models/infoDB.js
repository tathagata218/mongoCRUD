const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoData = new Schema({
    name : {type : String, required : true  },
    info : {type : String, required : true}
});

const userInfoCol = mongoose.model('userInfoCol',infoData);

module.exports = userInfoCol; 