const moment = require("moment/moment");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const MongooseSchemas = require("./TableSchemaControler")
const EventSchema = MongooseSchemas.EventSchema

function checkEventOverlap(allEvents, data){

    const sameEvent = allEvents.some(e => {

        const dataStart = moment(moment(data.start).format("YYYY-MM-DD HH:mm:ss"), 'YYYY-MM-DD HH:mm:ss')
        const dataEnd = moment(moment(data.end).format("YYYY-MM-DD HH:mm:ss"), 'YYYY-MM-DD HH:mm:ss')
        const eStart = moment(moment(e.start).format("YYYY-MM-DD HH:mm:ss"), 'YYYY-MM-DD HH:mm:ss')
        const eEnd = moment(moment(e.end).format("YYYY-MM-DD HH:mm:ss"), 'YYYY-MM-DD HH:mm:ss')

        // console.log(dataStart.isBetween(eStart, eEnd))
        // console.log(dataEnd.isBetween(eStart, eEnd))


        if(dataStart.isBetween(eStart, eEnd) || dataEnd.isBetween(eStart, eEnd) || eStart.isBetween(dataStart, dataEnd) || eEnd.isBetween(dataStart, dataEnd)){

            return {error: "You can't create more than 2 events in one timeline"}

        }
        else if(moment(dataStart).isSame(eStart) || moment(dataEnd).isSame(eEnd)){

            return {error: "You can't create more than 2 events in one timeline"}

        }
    })

    if(sameEvent){
        return {error: "You can't create more than 2 events in one timeline"}
    }
    else{
        //add your event here
        return "You can add your event"
    }

}
