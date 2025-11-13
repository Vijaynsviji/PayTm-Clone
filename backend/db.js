import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017');


const UserSchema = new mongoose.Schema({
    firstName: String,
    secondName: String,
    userName: String,
    password: String
})


const Users = mongoose.model('Users', UserSchema);

export default Users;