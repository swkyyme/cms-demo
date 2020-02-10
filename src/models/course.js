const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: {
        type: String,
        uppercase: true,
        alias: 'code'
    },
    name: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        default:''
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId, //student's id type
        ref: 'Student'
    }],
    __v: {
        type: Number,
        select: false
    },
    createAt: {
        type: Date,
        select: false
    }
},
{
    timestamps: true,
    toJSON: {virtuals: true},
    id: false
}
)

const model = mongoose.model('Course', schema);

module.exports = model;