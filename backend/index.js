const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const fs = require('fs');
const moment = require('moment');
const {verify} = require("jsonwebtoken");



//UserBuyer Func imports
const WorkerFunctions = require("./dbController/WorkerSchemaController")
const {
    createWorker: createWorker,
    loginWorker: loginWorker,
    getAllWorkers: getAllWorkers,
    getOneWorker: getOneWorker,
    ChangeWorkerPassword: ChangeWorkerPassword,
    ChangeWorkerColor: ChangeWorkerColor
} = WorkerFunctions;


//Event Func imports
const EventFunctions = require("./dbController/EventShemaController")
const {
    createEvent: createEvent,
    findAllEventsFromThisMonth: findAllEventsFromThisMonth,
    findAllEvents: findAllEvents,
    findAllPatientEvents: findAllPatientEvents,
    findAllWorkerEvents: findAllWorkerEvents,
    findOneEvent: findOneEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
} = EventFunctions;


//Patient Func imports
const PatientFunctions = require("./dbController/PatientSchemaController")
const {
    createPatient: createPatient,
    findOnePatient: findOnePatient,
    findOnePatientWithNo: findOnePatientWithNo,
    searchPatients: searchPatients,
    findAllPatients: findAllPatients,
    updatePatient: updatePatient,
    deletePatient: deletePatient,
} = PatientFunctions;





require('dotenv').config()

const upload = multer({ dest: 'public/patient_Images/', limits: { fieldSize: 10000 * 1024 * 1024 }}) // 10000mb

const app = express();



//cors
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE"]
}))

app.use(express.static('public'));
app.use(express.json({limit: '10000mb'}));





    //functions

    //app
    app.get("/", (req, res) => {
        res.json("hello world")
    })


    //workers
    app.post("/createWorker", async (req, res) => {

        const data = {
            username: req.body.username,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,

            password: req.body.password,

            userEventColor: req.body.userEventColor,
        }

        const User = await createWorker(data)

        res.json(User)
    })
    app.post("/loginWorker", async (req, res) => {

        const loginToken = await loginWorker({
            username: req.body.username,
            password: req.body.password
        })

        res.header('authorization', loginToken.token).send(loginToken)
    })
    app.get("/getAllWorkers", async (req, res) => {
        let page;

        if(req.query.page){
            page = parseInt(req.query.page);
        }
        else{
            page = 1;
        }

        const Items = await getAllWorkers(page)

        res.json(Items)
    })
    app.get("/getOneWorker", async (req, res) => {

        const UserUUID = req.query.userUUID;

        const User = await getOneWorker(UserUUID)

        res.json(User)
    })
    app.put("/changeWorkerPassword",  async (req, res) => {
        const uuID = req.query.userUUID;
        const oldPass = req.body.oldPass;
        const newPass = req.body.newPass;

        const user = await ChangeWorkerPassword(uuID, oldPass, newPass)

        res.json(user)
    })
    app.put("/changeWorkerColor", verify, async (req, res) => {
        const uuID = req.query.userUUID;
        const color = req.body.color

        const user = await ChangeWorkerColor(uuID, color)

        res.json(user)
    })










    //events

    //create event
    app.post("/createEvent", verify, async (req, res) => {
        const data = {
            title: req.body.title,
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            description: req.body.description,
            from: req.body.from,
            fromName: req.body.fromName,
            color: req.body.color || "#255984",
            patient: req.body.patient,
            patientName: req.body.patientName,
            bill: req.body.bill,
            billType: req.body.billType || "Euro",
            payed: req.body.payed || false
        }

        const event = await createEvent(data)
        res.json(event)
    })

    //get all events
    app.get("/findAllEvents", verify, async (req,res) => {
        let page;

        if(req.query.page){
            page = parseInt(req.query.page);
        }
        else{
            page = 1;
        }
        const data = await findAllEvents(page)
        res.json(data)
    })

    //get all patient
    app.get("/findAllPatientEvents", verify, async (req,res) => {
        let page;

        if(req.query.page){
            page = parseInt(req.query.page);
        }
        else{
            page = 1;
        }
        const data = await findAllPatientEvents(req.query.uuID ,page)
        res.json(data)
    })

    //get all patient
    app.get("/findAllWorkerEvents", verify, async (req,res) => {
        let page;

        if(req.query.page){
            page = parseInt(req.query.page);
        }
        else{
            page = 1;
        }
        const data = await findAllWorkerEvents(page)
        res.json(data)
    })

    //get events from this month
    app.get("/findAllEventsFromThisMonth", verify, async (req,res) => {

        let userDate;

        if(req.query.userDate){
            userDate = JSON.parse(req.query.userDate);
        }
        else{
            userDate = new Date;
        }

        console.log(userDate)

        const data = await findAllEventsFromThisMonth(userDate)
        res.json(data)
    })


    app.get("/findOneEvent", verify, async (req,res) => {

        const data = await findOneEvent(req.query.uuID)

        res.json(data)
    })

    //update event
    app.put("/updateEvent", verify, async (req, res) => {

        const data = {
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            description: req.body.description,
            from: req.body.from,
            color: req.body.color,
            patient: req.body.patient,
            patientName: req.body.patientName,
            bill: req.body.bill,
            billType: req.body.billType,
            payed: req.body.payed
        }

        const uuID = req.query.uuID

        const event = await updateEvent(data, uuID)
        res.json(event)
    })

    //delete event
    app.delete("/deleteEvent/:uuID", verify, async (req, res) => {
        const deleteduuID = req.params.uuID;
        const data = await deleteEvent(deleteduuID);
        res.send(data)
    })










    //Patients

    //create patient
    app.post("/uploadPatientImage", upload.single('image'), async (req, res) => {

        try{

            const uuidOne = uuidv4()
            const uuidTwo = uuidv4()

            const finalName = `patient_Images/${uuidOne}-${uuidTwo}.png`

            console.log(req.file)
            fs.renameSync(`public/patient_Images/${req.file.filename}`, `public/${finalName}`);


            res.json({finalName: finalName})
        }
        catch(e){
            res.json({error: e})
        }

    })

    app.post("/createPatient", verify, async (req, res) => {
        const data = {
            name: req.body.name,
            surname: req.body.surname,
            fullName: `${req.body.name} ${req.body.surname}`,
            parentName: req.body.parentName,
            bornIn: req.body.bornIn,
            birthPlace: req.body.birthPlace,

            address: req.body.address,

            email: req.body.email,
            phone: req.body.phone,
            embg: req.body.embg,
            debt: 0,
            debtCurrencyType: "Euro",
            status: false,

            patientImage: req.body.patientImage,
        }

        const event = await createPatient(data)
        res.json(event)
    })

    //get all patients
    app.get("/findAllPatients", verify, async (req,res) => {
        let page;

        if(req.query.page){
            page = parseInt(req.query.page);
        }
        else{
            page = 1;
        }
        const data = await findAllPatients(page)
        res.json(data)
    })

    //search patients
    app.get("/searchPatients", verify, async (req,res) => {
        let page, limit;

        if(req.query.page){
            page = parseInt(req.query.page);
        }
        else{
            page = 1;

        }

        if(req.query.limit){
            limit = parseInt(req.query.limit);
        }
        else{
            limit = 15;

        }


        const data = await searchPatients(req.body.dataQuery, page, limit)
        res.json(data)
    })


    //search active patients
    app.get("/searchActivePatients", verify, async (req,res) => {
        let page, limit;

        if(req.query.page){
            page = parseInt(req.query.page);
        }
        else{
            page = 1;

        }

        if(req.query.limit){
            limit = parseInt(req.query.limit);
        }
        else{
            limit = 15;

        }

        const data = await searchPatients({status: true}, page, limit)
        res.json(data)
    })

    //search inActive patients
    app.get("/searchInActivePatients", verify, async (req,res) => {
        let page, limit;

        if(req.query.page){
            page = parseInt(req.query.page);
        }
        else{
            page = 1;

        }

        if(req.query.limit){
            limit = parseInt(req.query.limit);
        }
        else{
            limit = 15;

        }

        const data = await searchPatients({status: false}, page, limit)
        res.json(data)
    })

    //search name patients
    app.get("/searchFullNamePatients", verify, async (req,res) => {
        let page, limit;

        if(req.query.page){
            page = parseInt(req.query.page);
        }
        else{
            page = 1;

        }

        if(req.query.limit){
            limit = parseInt(req.query.limit);
        }
        else{
            limit = 15;

        }

        const data = await searchPatients({fullName: { $regex: req.query.fullName, $options: 'i' }}, page, limit)
        res.json(data)
    })

    //search phone patients
    app.get("/searchPhonePatients", verify, async (req,res) => {
        let page, limit;

        if(req.query.page){
            page = parseInt(req.query.page);
        }
        else{
            page = 1;

        }

        if(req.query.limit){
            limit = parseInt(req.query.limit);
        }
        else{
            limit = 15;

        }

        const data = await searchPatients({phone: { $regex: req.query.phone, $options: 'i' }}, page, limit)
        res.json(data)
    })

    //search no patients
    app.get("/searchNoPatients", verify, async (req,res) => {
        let page, limit;

        if(req.query.page){
            page = parseInt(req.query.page);
        }
        else{
            page = 1;

        }

        if(req.query.limit){
            limit = parseInt(req.query.limit);
        }
        else{
            limit = 15;

        }

        console.log(req.query)

        // const data = await searchPatients({no: parseInt(req.query.no)}, page, limit)
        res.json(parseInt(req.query.no))
    })


    //get one patient
    app.get("/findOnePatient", verify, async (req,res) => {

        const UserUUID = req.query.patientUUID;

        const Patient = await findOnePatient(UserUUID)

        res.json(Patient)
    })

    //get one patient
    app.get("/findOnePatientWithNo", verify, async (req,res) => {

        const patientNo = req.query.patientNo;

        const Patient = await findOnePatientWithNo(patientNo)

        res.json(Patient)
    })

    //update event
    app.put("/updatePatient", verify, async (req, res) => {

        const data = {
            name: req.body.name,
            surname: req.body.surname,
            parentName: req.body.parentName,
            bornIn: req.body.bornIn,
            birthPlace: req.body.birthPlace,

            address: req.body.address,

            email: req.body.email,
            phone: req.body.phone,
            embg: req.body.embg,
            debt: req.body.debt,
            debtCurrencyType: req.body.debtCurrencyType,
            status: req.body.status,

            patientImage: req.body.patientImage,
        }

        const uuID = req.query.uuID

        const Patient = await updatePatient(data, uuID)
        res.json(Patient)
    })

    //delete event
    app.delete("/deletePatient/:uuID", verify, async (req, res) => {
        const AdminPass =  process.env.DELETEPASS || "AdminPass"

        if(req.query.pass !== AdminPass){
            res.json({error: "Password Incorrect"}).status(401)
            return
        }
        else{
            const deleteduuID = req.params.uuID;
            const data = await deletePatient(deleteduuID);
            res.json(data)
        }

    })












app.listen(3001);