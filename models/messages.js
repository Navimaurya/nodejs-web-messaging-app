const mongoose = require('mongoose');

//Message collection schemas
const messageSchema = mongoose.Schema({
    sender: {
        type : mongoose.Schema.ObjectId,
        ref: 'Users',
        require : [true, 'Message should have a sender refrence']
    },
    receiver : {
        type: mongoose.Schema.ObjectId,
        ref : 'Users',
        require: [true, 'Message should have a receiver refrence']
    },
    message:{
        type: String,
        minlength : 1,
        require: [true, 'Message should have a value'],
    },
    //Time when message is sent or receiver from receiver end
    sent: {
        type : Date,
        default:new Date()
    },
    //Time when message is delivered to receiver
    delivered : {
        type : Date,
        default: null
    },
    //Time when message is seen
    seen : {
        type : Date,
        default : null
    }
});

// messageSchema.pre(/^find/, async function (){
//     if (!this.delivered) this.delivered = new Date();
// });
messageSchema.post(/^find/,  async function(){
    if (!this.delivered){
        await this.update({}, { delivered: new Date() } );
        // this.delivered = new Date();
    }
    // next();
});
messageSchema.pre(/^find/, function (next){
    this.populate({
        path : 'sender',
        select: 'phone image active'
    });
    next();
});

messageSchema.index({receiver : 1});
messageSchema.index({sender : 1});

module.exports = mongoose.model('messages', messageSchema);