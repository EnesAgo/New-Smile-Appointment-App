const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const MongooseSchemas = require("./TableSchemaControler")
const Worker = MongooseSchemas.WorkerSchema

/*

    username: String,
    name: String,
    surname: String,
    email: String,

    password: String,
    uuID: String,
    isAdmin: Boolean,

    userEventColor: String,


* */


async function createWorker(data){
    try{

        //checkUserName
        const oldUserUsername = await Worker.findOne({
            username: data.username
        })

        if(oldUserUsername || oldUserUsername != null){
            return {error: 'username found'};
        }


        //checkUserEmail
        const oldUserEmail = await Worker.findOne({
            email: data.email
        })

        if(oldUserEmail || oldUserEmail != null){
            return {error: 'user email found'};
        }

        //checkUserPhone
        const oldUserPhone = await Worker.findOne({
            phone: data.phone
        })

        if(oldUserPhone || oldUserPhone != null){
            return {error: 'user phone number found'};
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password, salt)
        const uuIDString = uuidv4();

        const hashedData = {
            username: data.username,
            name: data.name,
            surname: data.surname,
            email: data.email,
            
            password: hashedPassword,
            uuID: uuIDString,
            isAdmin: false,

            userEventColor: data.userEventColor,
        }

        const user = await Worker.create(hashedData)

        const token = jwt.sign({uuID: data.uuID}, process.env.JWT_SECRET)

        const dataUser = {
            username: user.username,
            name: user.name,
            surname: user.surname,
            email: user.email,
            
            uuID: data.uuID,
            isAdmin: data.isAdmin,
            
            userEventColor: user.userEventColor,

            token: token
        }


        return dataUser

    }catch (e){
        return {error: e}
    }
}
async function loginWorker(data){
    try{

        const user = await Worker.findOne({
            username: data.username
        })

        if(!user || user == null){
            return {error: 'user not found'};
        }

        const validPass = await bcrypt.compare(data.password, user.password);
        if(!validPass) return {error: 'user password incorrect'}


        const token = jwt.sign({uuID: user.uuID}, process.env.JWT_SECRET)

        const dataUser = {
            username: user.username,
            name: user.name,
            surname: user.surname,
            email: user.email,

            uuID: data.uuID,
            isAdmin: data.isAdmin,

            userEventColor: user.userEventColor,

            token: user.token
        }

        return dataUser;

    }catch (e){
        return {error: e}
    }
}

async function getAllWorkers(page){
    try{

        // define limit per page
        const limit = 15;
        const offset = (page - 1) * limit;


        const total = await Worker.countDocuments({});

        const Users = await Worker.find({}).skip(offset).limit(limit);

        const dataUsers = Users.map(e => {
            return {
                username: e.username,
                name: e.name,
                surname: e.surname,
                email: e.email,

                uuID: e.uuID,
                isAdmin: e.isAdmin,

                userEventColor: e.userEventColor,

                token: e.token
            }
        })


        console.log(dataUsers)

        return { total, dataUsers, page }

    }catch (e){
        return {error: e}
    }
}

async function getOneWorker(uuID){
    try{

        // define limit per page
        const user = await Worker.find({uuID: uuID});

        if(!user || user === null) return {error: "user not found"}

        const dataUser = {
            username: user.username,
            name: user.name,
            surname: user.surname,
            email: user.email,

            uuID: data.uuID,
            isAdmin: data.isAdmin,

            userEventColor: user.userEventColor,

            token: e.token
        }



        console.log(dataUser)

        return dataUser

    }catch (e){
        return {error: e}
    }
}

async function ChangeWorkerPassword(uuID, oldPass, newPass){
    try{

        const User = await Worker.findOne({ uuID: uuID })

        const validPass = await bcrypt.compare(oldPass, User.password);


        if(!validPass) {
            console.log({error: "Incorrect Password"})
            return {error: "Incorrect Password"};
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPass, salt)



        const updated = await Worker.findOneAndUpdate(
            {uuID: uuID},
            {password: hashedPassword}
        )

        console.log(updated)

        return {success: "password successfully changed"}

    }catch (e){
        return {error: e}
    }
}


async function ChangeWorkerColor(uuID, userEventColor){
    try{

        const User = await Worker.findOne({ uuID: uuID })

        if(User == null){
            return {error: "Item not found"}
        }

        const updated = await Worker.findOneAndUpdate({uuID: uuID}, {userEventColor: userEventColor})

        return updated

    }catch (e){
        return {error: e}
    }
}




module.exports = {
    createWorker: createWorker,
    loginWorker: loginWorker,
    getAllWorkers: getAllWorkers,
    getOneWorker: getOneWorker,
    ChangeWorkerPassword: ChangeWorkerPassword,
    ChangeWorkerColor: ChangeWorkerColor
};