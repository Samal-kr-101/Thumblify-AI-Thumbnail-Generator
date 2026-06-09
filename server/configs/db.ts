import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        console.log("MONGODB_URI:", process.env.MONGODB_URI);
        mongoose.connection.on('connected',()=>console.log('MongoDB connected'))
        await mongoose.connect(process.env.MONGODB_URI as string)
    } catch(error){
        console.log('Error connecting to MongoDB',error)
    }
}

export default connectDB;