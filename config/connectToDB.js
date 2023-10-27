import mongoose from 'mongoose'

const connectToDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    console.log('Database Connected Successfully')
  } catch (err) {
    console.log('database connection error', err)
    process.exit(1)
  }
}

export default connectToDB
