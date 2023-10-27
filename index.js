import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import connectToDB from './config/connectToDB.js'
import User from './models/user.schema.js'
import morgan from 'morgan'

dotenv.config()

const app = express()

app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(morgan('dev'))

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/api/passbook/:accountNumber', async (req, res) => {
  try {
    const { accountNumber } = req.params

    const data = await User.findOne({ accountNumber })
    res.status(200).json({
      success: true,
      data,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    })
  }
})

app.post('/api/passbook/:accountNumber', async (req, res) => {
  const { accountNumber } = req.params
  const newTransaction = req.body

  try {
    const user = await User.findOne({ accountNumber })
    user.transactions.push(newTransaction)
    await user.save()
    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    })
  }
})
app.listen(process.env.PORT || 3000, () => {
  try {
    connectToDB()
    console.log('Server is Live')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})
