import { Schema, model, connect } from 'mongoose';


/*
As per the requirement of the project, it is understood that embedded 
data modelling is most suitable for this project. 
*/

interface userRegistrationDoc{
        userRegisterData:{
        name: string,
        email: string,
        password: string,
        userName: string,
        date: Date
      },
      userBankData: {
        accountNumber: string,
        accountType: string,
        currentAmount: Number
      },
      transactions: {
        sent: [Number],
        recieved: [Number]
      }
}


const userRegisterSchema = new Schema<userRegistrationDoc>({
  userRegisterData: {
    name: {
      type: String,
      required: true,
      maxLength: 100
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
    }
  },
  userBankData: {
    accountNumber: {
      type: String,
      default: 'XXXX'
    },
    accountType: {
      type: String,
      default: 'savings'
    },
    currentAmount: {
      type: Number,
      default: 0
    }
  },
  transactions: {
    sent: [{
      type: Number
    }],
    recieved: [{
      type: Number
    }]
  }
})

const UserReg = model<userRegistrationDoc>('usersBankData', userRegisterSchema)

export { UserReg }
