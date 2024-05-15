import mongoose, {Schema} from "mongoose"


const NewAccountSchema =new mongoose.Schema({
    uid: String,
    name: String,
    pin: String
},

{
    timestamps:true
})

export const Account =mongoose.models.Account || mongoose.model('Account', NewAccountSchema)

