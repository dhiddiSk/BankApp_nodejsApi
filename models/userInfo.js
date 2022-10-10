const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// As per the requirement of the project, it is understood that embedded data model is most suitable for this project

// Basic schema for the user registration
const userRegisterSchema = new Schema({
  userRegisterData: {
    name: {
      type: String,
      required: true,
      maxLength: 50
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true,
      maxLength: 100
    },
    date: {
      type: Date,
      default: Date.now
    },
  },
  userBankData: {
    accountNumber: {
      type: String,
      default: "XXXX"
    },
    accountType: {
      type: String,
      default: "savings"
    },
    currentAmount: {
      type: Number,
      default: 0
    },
  },
  transactions: {
    sent: [{
      type: Number
    }],
    recieved: [{
      type: Number
    }]
  },
});

const userReg = mongoose.model("usersBankData", userRegisterSchema);

export default userReg;
