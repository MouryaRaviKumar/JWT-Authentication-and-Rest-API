const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
        user : {
            type : mongoose.Schema.ObjectId,
            required : true,
            ref : 'User',
        },
        title : {
            type : String,
            required : [true,"Please Add a Title to the Goal"]
        }
    },
    {
        timestamps : true
    },
);

module.exports = mongoose.model("Goal",goalSchema);