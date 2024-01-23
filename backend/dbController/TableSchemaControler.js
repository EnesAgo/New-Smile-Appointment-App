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
    start: Date,
    end: Date,
    description: String,
    from: String,
    fromName: String,
    patient: String,
    patientName: String,
    patientPhone: String,
    bill: Number,
    billType: String,
    payed: Boolean,
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
    fullName: String,
    parentName: String,
    bornIn: String,
    birthPlace: String,
    address: String,

    email: String,
    phone: String,
    embg: Number,
    debt: Number,
    debtCurrencyType: String,
    status: Boolean,

    patientImage: String,

    billingUUID: String,
    uuID: String,
    medUUID: String,
})

const MedHistorySchema = new mongoose.Schema({
    medicine: String,
    allergies: String,
    stableHealth: Boolean,
    operationInFiveYears: Boolean,
    HepatitisDisease: Boolean,
    jaundiceDisease: Boolean,
    hiv: Boolean,
    pregnant: Boolean,
    uuID: String,
})


module.exports = {
    EventSchema: mongoose.model("Events", EventSchema),
    WorkerSchema: mongoose.model("Workers", WorkerSchema),
    PatientSchema: mongoose.model("Patients", PatientSchema)
}