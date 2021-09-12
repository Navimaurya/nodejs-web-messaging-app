const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const authController = require('./authController');
const Contact = require('./../models/contacts');
const User = require('./../models/users');

exports.getLoggedInUser = catchAsync(async (req, res, next)=>{
   req.user.image = req.protocol + "://" + req.get("host") + "/users/profile/" + req.user.image ;
   res.status(200).json({
       status : 'success',
       data: req.user
   })
});

exports.addContact = catchAsync(async (req, res, next)=>{
    const {code, number, name, email = null} = req.body;
    if (!code || !number || !name) return next(new AppError('Please provide number and name.'));
    if ((number.toString()).length != 10 ) return next(new AppError("Provide a valid number.", 400));
    if (number == req.user.phone) return next(new AppError("You cannot add yourself as contact.", 400));

    let friend = await User.findOne({phone : number});
    if (!friend) return next(new AppError("User not using our service.", 400));
    let newContact = await Contact.findOne({$and:[{friend : friend._id}, {user: req.user._id}]});
    let operation = 'updated';

    if (!newContact){
        newContact =  new Contact({user: req.user._id, friend : friend._id});
        operation = 'add';
    }
    newContact.name = name;
    if (email)  newContact.email = email;
    const data = await newContact.save();
    data.friend.image = req.protocol + "://" + req.get("host") + "/users/profile/" + data.friend.image
    res.status(200).json({
        status : 'success',
        operation,
        data
    });
});

exports.getFriendList = catchAsync(async (req, res, next)=>{
    const user = req.user._id;
    let data = await Contact.find({user}).sort({name : 1}) || [];
    if (data.length > 0){
        data.forEach((item, i)=>{
            data[i].friend.image = req.protocol + "://" + req.get("host") + "/users/profile/" + data[i].friend.image;
        });
    }
    res.status(200).json({
        status : 'success',
        total : data.length,
        data
    });
});