import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017');



const UserSchema = new mongoose.Schema({
    firstName: String,
    secondName: String,
    userName: String,
    password: String
})


const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

export const Users = mongoose.model('Users', UserSchema);
export const Account = mongoose.model("Account",AccountSchema);

