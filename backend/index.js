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
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
} = EventFunctions;


//Patient Func imports
const PatientFunctions = require("./dbController/PatientSchemaController")
const {
    createPatient: createPatient,
    findOnePatient: findOnePatient,
    searchPatients: searchPatients,
    findAllPatients: findAllPatients,
    updatePatient: updatePatient,
    deletePatient: deletePatient,
} = PatientFunctions;





require('dotenv').config()

const upload = multer({ dest: 'public/parentName/', limits: { fieldSize: 10000 * 1024 * 1024 }}) // 10000mb

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

        return user
    })
    app.put("/changeWorkerColor", verify, async (req, res) => {
        const uuID = req.query.userUUID;
        const color = req.body.color

        const user = await ChangeWorkerColor(uuID, color)

        return user
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
            color: req.body.color || "#255984",
            patient: req.body.patient,
            bill: req.body.bill,
            billType: req.body.billType || "mkd",
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
        const data = await findAllPatientEvents(page)
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
        const data = await findAllEventsFromThisMonth()
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

            const finalName = `public/parentName/${uuidOne}-${uuidTwo}.png`

            console.log(req.file)
            fs.renameSync(`public/parentName/${req.file.filename}`, finalName);


            res.json({finalName: finalName})
        }
        catch(e){
            res.json({error: e})
        }

    })

    app.post("/createPatient", verify, async (req, res) => {
        const defaultImg = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.awAiMS1BCAQ2xS2lcdXGlwHaHH%26pid%3DApi&f=1&ipt=da636c11b0380e062d4a8ab26a212d392e7cb46a8ffd5fc083dee44e68c266a4&ipo=images'

        const data = {
            name: req.body.name,
            surname: req.body.surname,
            fullName: `${req.body.name} ${req.body.surname}`,
            parentName: req.body.parentName,
            bornIn: req.body.bornIn,
            birthPlace: req.body.birthPlace,

            email: req.body.email,
            phone: req.body.phone,
            embg: req.body.embg,
            debt: 0,
            debtCurrencyType: "Euro",
            status: false,

            patientImage: req.body.patient || defaultImg,
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

        if(req.query.page){
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

        if(req.query.page){
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

        if(req.query.page){
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

        if(req.query.page){
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

        if(req.query.page){
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

        if(req.query.page){
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

        res.json(Patient[0])
    })

    //update event
    app.put("/updatePatient", verify, async (req, res) => {

        const data = {
            name: req.body.name,
            surname: req.body.surname,
            bornIn: req.body.bornIn,
            birthPlace: req.body.birthPlace,

            email: req.body.email,
            phone: req.body.phone,
            embg: req.body.embg,
            debt: req.body.debt,
            debtCurrencyType: req.body.debtCurrencyType,
            status: req.body.status,

            patientImage: req.body.patient,
        }

        const uuID = req.query.uuID

        const Patient = await updatePatient(data, uuID)
        res.json(Patient)
    })

    //delete event
    app.delete("/deletePatient/:uuID", verify, async (req, res) => {
        const deleteduuID = req.params.uuID;
        const data = await deletePatient(deleteduuID);
        res.send(data)
    })












app.listen(3001);