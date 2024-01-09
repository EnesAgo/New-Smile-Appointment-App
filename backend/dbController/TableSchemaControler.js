const mongoose = require("mongoose");

require("dotenv").config()
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("connected");
},e => {
    console.log(e)
})

const EventSchema = new mongoose.Schema({
    title: String,
    start: String,
    end: String,
    description: String,
    from: String,
    color: String,
    uuID: String,

})

const WorkerSchema = new mongoose.Schema({
    username: String,
    name: String,
    surname: String,
    email: String,

    password: String,
    uuID: String,
    isAdmin: Boolean,

    userEventColor: String,
})

const PatientSchema = new mongoose.Schema({
    no: Number,

    name: String,
    surname: String,
    bornIn: String,
    birthPlace: String,

    email: String,
    phone: String,
    embg: Number,
    debt: Number,
    debtCurrencyType: String,
    status: Boolean,

    patientImage: String,

    billingUUID: String,
    uuID: String,
})


module.exports = {
    EventSchema: mongoose.model("Events", EventSchema),
    WorkerSchema: mongoose.model("Workers", WorkerSchema),
    PatientSchema: mongoose.model("Patients", PatientSchema)
}