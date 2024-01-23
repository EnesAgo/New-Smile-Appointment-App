const moment = require("moment/moment");
const { v4: uuidv4 } = require('uuid');

const MongooseSchemas = require("./TableSchemaControler")
const MedHistorySchema = MongooseSchemas.MedHistorySchema


async function createMedHistory(data){
    try{

        const postData = {
            ...data
        }

        console.log(postData)


        const MedHistory = await MedHistorySchema.create(postData)

        return MedHistory
    }
    catch (e){
        return {error: e}
    }
}

async function findOneMedHistory(uuID){
    try{

        const MedHistory = await MedHistorySchema.findOne({patientUUID: uuID});

        if(!MedHistory || MedHistory === null) return {error: "MedHistory not found"}


        return MedHistory
    }
    catch (e){
        return {error: e}
    }
}

async function updateMedHistory(data, uuID) {

    const updated = await MedHistorySchema.findOneAndUpdate({patientUUID: uuID}, data)

    return updated;
}

async function deleteMedHistory(deleteduuID) {
    try{

        const deleted = await MedHistorySchema.deleteOne({
            patientUUID: deleteduuID
        })

        return {success: "MedHistory deleted successfully", deleted}

    }
    catch(e){
        return {error: e};
    }

}




module.exports = {
    createMedHistory: createMedHistory,
    findOneMedHistory: findOneMedHistory,
    updateMedHistory: updateMedHistory,
    deleteMedHistory: deleteMedHistory,
};