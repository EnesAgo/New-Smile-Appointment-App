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

        const uuIDString = uuidv4();

        const startDate = moment(data.start).subtract(14, 'days').startOf("day").format('YYYY-MM-DD[T00:00:00.000Z]')
        const endDate = moment(data.end).add(14, 'days').endOf('day').format('YYYY-MM-DD[T00:00:00.000Z]')

        // const startDate = moment(data.start).subtract(2, "w").format()
        // const endDate = moment(data.end).add(2, "w").format()


        const AllEvents = await EventSchema.find({
        start: { "$gte": data.start, "$lte": data.end }
        });

        const isOverlapping = checkEventOverlap(AllEvents, data)

        if(isOverlapping.error){
            return isOverlapping
        }

        const postData = {
            ...data,
            uuID: uuIDString
        }

        console.log(postData)


        const event = await EventSchema.create(postData)

        return event
    }
    catch (e){
        return {error: e}
    }
}

async function findAllEventsFromThisMonth(userDate){
    try{

        console.log(userDate)

        const startDate = new Date(moment(new Date(userDate)).subtract(45, 'days').toISOString())
        const endDate = new Date(moment(new Date(userDate)).add(45, 'days').toISOString())

        const AllEvents = await EventSchema.find({
            start: { $gte: startDate, $lte: endDate }
        });

        const total = await EventSchema.countDocuments({
            start: { $gte: startDate, $lte: endDate }
        });

        return { total, AllEvents, userDate }
    }
    catch (e){
        console.log(e)
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

async function findAllPatientEvents(patient, page){
    try{
        const limit = 15;
        const offset = (page - 1) * limit;

        const total = await EventSchema.countDocuments({patient: patient});

        const AllEvents = await EventSchema.find({patient: patient}).skip(offset).limit(limit);

        return { total, AllEvents, page }
    }
    catch (e){
        return {error: e}
    }
}

async function findAllWorkerEvents(worker, page){
    try{
        const limit = 15;
        const offset = (page - 1) * limit;

        const total = await EventSchema.countDocuments({from: worker});

        const AllEvents = await EventSchema.find({from: worker}).skip(offset).limit(limit);

        return { total, AllEvents, page }
    }
    catch (e){
        return {error: e}
    }
}

async function updateEvent(data, uuID) {

    const startDate = moment(new Date(data.start)).subtract(14, 'days')
    const endDate = moment(new Date(data.end)).add(14, 'days')

    const prevElement = await EventSchema.findOne({uuID: uuID})

    if(
        moment(prevElement.start).format("DD MMM YYYY hh:mm") === moment(data.start).format("DD MMM YYYY hh:mm") &&
        moment(prevElement.end).format("DD MMM YYYY hh:mm") === moment(data.end).format("DD MMM YYYY hh:mm")
    ){
        const updated = await EventSchema.findOneAndUpdate({uuID: uuID}, data)

        return updated;
    }

    const AllEvents = await EventSchema.find({
        start: { $gte: startDate, $lte: endDate }
    });

    const isOverlapping = checkEventOverlap(AllEvents, data)

    if(isOverlapping.error){
        return isOverlapping
    }

    const updated = await EventSchema.findOneAndUpdate({uuID: uuID}, data)

    return updated;
}

async function deleteEvent(deleteduuID) {
    try{

        const deleted = await EventSchema.deleteOne({
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
    findAllPatientEvents: findAllPatientEvents,
    findAllWorkerEvents: findAllWorkerEvents,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
};