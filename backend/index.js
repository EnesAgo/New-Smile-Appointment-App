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




app.listen(3001);