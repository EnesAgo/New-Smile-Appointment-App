const moment = require("moment/moment");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const MongooseSchemas = require("./TableSchemaControler")
const PatientSchema = MongooseSchemas.PatientSchema


async function createPatient(data){
    try{

        const uuIDString = uuidv4();
        const medUUIDString = uuidv4();

        const latestInserted = await PatientSchema.find({}).sort({"no": -1}).limit(1)

        let newNoNum;

        if(!latestInserted || latestInserted.length === 0 || latestInserted === []){
            newNoNum = 0;
        }
        else{
            newNoNum = parseInt(latestInserted[0].no) + 1
        }

        const newUUID = data.uuID || uuIDString


        const postData = {
            ...data,
            no: newNoNum,
            uuID: newUUID,
            medUUID: medUUIDString
        }

        console.log(postData)


        const Patient = await PatientSchema.create(postData)

        return Patient
    }
    catch (e){
        return {error: e}
    }
}

async function findOnePatient(uuID){
    try{

        const Patient = await PatientSchema.findOne({uuID: uuID});

        if(!Patient || Patient === null) return {error: "Patient not found"}


        return Patient
    }
    catch (e){
        return {error: e}
    }
}

async function findOnePatientWithNo(no){
    try{

        const Patient = await PatientSchema.findOne({no: no});

        if(!Patient || Patient === null) return {error: "Patient not found"}


        return Patient
    }
    catch (e){
        return {error: e}
    }
}

async function searchPatients(data, page, limit){
    try{

        const offset = (page - 1) * limit;

        const total = await PatientSchema.countDocuments(data);

        const searchedPatients = await PatientSchema.find(data).skip(offset).limit(limit);

        if(!searchedPatients || searchedPatients === null) return {error: "Patients not found"}

        return { total, searchedPatients, page }
    }
    catch (e){
        return {error: e}
    }
}

async function findAllPatients(page){
    try{
        const limit = 15;
        const offset = (page - 1) * limit;

        const total = await PatientSchema.countDocuments({});

        const AllPatients = await PatientSchema.find({}).skip(offset).limit(limit);

        return { total, AllPatients, page }
    }
    catch (e){
        return {error: e}
    }
}

async function updatePatient(data, uuID) {

    const updated = await PatientSchema.findOneAndUpdate({uuID: uuID}, data)

    return updated;
}

async function deletePatient(deleteduuID) {
    try{

        const deleted = await PatientSchema.deleteOne({
            uuID: deleteduuID
        })

        return {success: "Patient deleted successfully", deleted}

    }
    catch(e){
        return {error: e};
    }

}




module.exports = {
    createPatient: createPatient,
    findOnePatient: findOnePatient,
    findOnePatientWithNo: findOnePatientWithNo,
    searchPatients: searchPatients,
    findAllPatients: findAllPatients,
    updatePatient: updatePatient,
    deletePatient: deletePatient,
};