import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  counterPartName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  referenceNo: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        // Check if the amount has a maximum of 2 decimal places
        if (value == 0) {
          return false
        } else {
          return /^(\d*\.\d{1,2}|\d+)$/.test(value)
        }
      },
      message:
        'Amount must be greater than zero and amount can have a maximum of 2 decimal places',
    },
  },
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  transactions: {
    type: [transactionSchema], // Embed the transaction schema
    default: [],

    validate: {
      validator: function (transactions) {
        // Check that all elements in the array are not null
        return transactions.every((transaction) => transaction !== null)
      },
      message: 'Transaction cannot contain be Null',
    },
  },
})

const User = mongoose.model('User', userSchema)

export default User
