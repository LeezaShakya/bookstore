const mongoose= require('mongoose')

module.exports =  connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }
    catch(err){
        console.log(err)
    }
}