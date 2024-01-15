const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
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
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
} = EventFunctions;




require('dotenv').config()



const app = express();



//cors
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE"]
}))

// app.use(express.static('../frontend/build'));
app.use(express.json({limit: '1000mb'}));





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
        const newEventUUID = uuidv4()
        const data = {
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            description: req.body.description,
            from: req.body.from,
            color: req.body.color || "#255984",
            patient: req.body.patient,
            bill: req.body.bill,
            uuID: newEventUUID,
        }

        const event = await createEvent(data)
        res.json(event)
    })

    //get events from this month
    app.get("/findAllEventsFromThisMonth", verify, async (req,res) => {
        const data = await findAllEventsFromThisMonth()
        res.json(data)
    })

    //get events
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

    //update event
    app.put("/updateEvent", verify, async (req, res) => {

        const data = {
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            description: req.body.description,
            from: req.body.from,
            color: req.body.color || "#255984",
            patient: req.body.patient,
            bill: req.body.bill,
        }

        const event = await updateEvent(data)
        res.json(event)
    })

    //delete event
    app.delete("/deleteEvent/:uuID", verify, async (req, res) => {
        const deleteduuID = req.params.uuID;
        const data = await deleteEvent(deleteduuID);
        res.send(data)
    })







app.listen(3001);