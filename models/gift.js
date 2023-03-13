const mongoose =require("mongoose");

const giftSchema = new mongoose.Schema({
    img:{type: String,required:true},
    name:{type: String,required:true},
    description:{type: String,required:true},
    price:{type:Number,min:0,max:10000,required:true},
    qty:{type:Number,min:0,max:5000,required:true},
});

const Gift = mongoose.model("Gift",giftSchema);

module.exports = Gift;