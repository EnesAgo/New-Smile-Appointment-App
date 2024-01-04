const mongoose = require("mongoose");

require("dotenv").config()
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("connected");
},e => {
    console.log(e)
})

const workerSchema = new mongoose.Schema({
    username: String,
    name: String,
    surname: String,
    email: String,
    phone: String,

    password: String,
    uuID: String,

    userImage: String,
    userBio: String
})


module.exports = {
    workerSchema: mongoose.model("Workers", workerSchema)
}