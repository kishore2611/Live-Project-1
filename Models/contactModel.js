const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    },
    number: {
        type: String
    },
    is_block: {
        type: Number,
        default: 0
    },
    is_favourite: {
        type: Number,
        default: 0
    },
    blocking_hours:{
        type: Number,
        default: null
    },
    blocking_days:{
        type: Number,
        default: null
    },
    un_block_at:{
        type: String
    }
},
    { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema); 
module.exports = Contact;