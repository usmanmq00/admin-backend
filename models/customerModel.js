const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    totalSpend: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

module.exports = Customer = mongoose.model("customers", CustomerSchema); 