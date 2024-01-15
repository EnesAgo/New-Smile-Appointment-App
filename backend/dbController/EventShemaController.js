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
        else{
            return true
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

async function createEvent(data){
    try{

        const startDate = moment(new Date(data.start)).subtract(14, 'days').startOf("day")
        const endDate = moment(new Date(data.end)).add(14, 'days').endOf('day')

        const AllEvents = await EventSchema.find({
        start: { $gte: startDate, $lte: endDate }
        });

        const isOverlapping = checkEventOverlap(AllEvents, data)

        if(isOverlapping.error){
            return isOverlapping
        }

        const event = await EventSchema.create(data)

        return event
    }
    catch (e){
        return {error: e}
    }
}

async function findAllEventsFromThisMonth(){
    try{

        const startDate = moment(new Date()).subtract(14, 'days').startOf("day")
        const endDate = moment(new Date()).add(14, 'days').endOf('day')

        const AllEvents = await EventSchema.find({
            start: { $gte: startDate, $lte: endDate }
        });

        return AllEvents
    }
    catch (e){
        return {error: e}
    }
}

async function findAllEvents(page){
    try{
        const limit = 15;
        const offset = (page - 1) * limit;

        const total = await EventSchema.countDocuments({});

        const AllEvents = await EventSchema.find({}).skip(offset).limit(limit);

        return { total, AllEvents, page }
    }
    catch (e){
        return {error: e}
    }
}

async function updateEvent(data) {

    const startDate = moment(new Date(data.start)).subtract(14, 'days').startOf("day")
    const endDate = moment(new Date(data.end)).add(14, 'days').endOf('day')

    const AllEvents = await EventSchema.find({
        start: { $gte: startDate, $lte: endDate }
    });

    const isOverlapping = checkEventOverlap(AllEvents, data)

    if(isOverlapping.error){
        return isOverlapping
    }

    const updated = await EventList.findOneAndUpdate({uuID: data.uuID}, data)

    return updated;
}

async function deleteEvent(deleteduuID) {
    try{

        const deleted = await EventList.deleteOne({
                uuID: deleteduuID
            })

        return {success: "Event deleted successfully", deleted}

    }
    catch(e){
        return {error: e};
    }

}




module.exports = {
    createEvent: createEvent,
    findAllEventsFromThisMonth: findAllEventsFromThisMonth,
    findAllEvents: findAllEvents,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
};