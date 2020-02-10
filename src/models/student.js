const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema(
    {
        // _id: {
        //     type: mongoose.Schema.Types.ObjectId
        // },
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        email: {
            type: String,
            required: true,
            validate: {
                // validator: email => !Joi.validate(email,Joi.string().email()).error, // v 15
                validator: email => !Joi.string().email().validate(email).error,
                msg: 'Invalid email format'
            }
        },
        courses: [{
            type: String,
            ref: 'Course'
        }],
        __v: {
            type: Number,
            select: false
        }
    },
    {
    timestamps: true,
    toJSON: {virtuals: true},
    }
);
schema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

const model = mongoose.model('Student', schema); //in collection Students

module.exports = model;