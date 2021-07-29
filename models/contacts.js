const mongoose = require('mongoose');
const validator = require('validator');
const Users = require('./../models/users');

const contactsSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref: 'Users',
        require : [true, 'Contact should belong to a user.']
    },
    friend: {
        type : mongoose.Schema.ObjectId,
        ref : 'Users',
        require:[true, 'Your friend should be on this app.']
    },
    name : {
        type: String,
        maxlength : 40,
        require : [true, "Please give a name to this contact"]
    },
    email : {
        type : String,
        require : false,
        validate : validator.isEmail
    },
}, { toJSON: { virtuals: true } });

contactsSchema.pre(/^find/, function (next){
    this.populate({
        path : 'friend',
        select : 'image phone website city about active code'
    });
    next();
});
contactsSchema.pre(/^save/, async function (next){
    await this.populate({
        path : 'friend',
        select : 'image phone website city about active code'
    }).execPopulate();
    next();
});

contactsSchema.index({number:1});
contactsSchema.index({name:1});
module.exports = mongoose.model('Contacts', contactsSchema);