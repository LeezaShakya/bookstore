import Activity from "../models/activitylogModel.js";
export default async function activityTracker(action,userId,actionType,actionId) {
    try{
        console.log(action,userId,actionType,actionId,"actiii")
        let createActivity = {
            action: action,
            userId: userId,
        }
        if (actionType === 'book'){
            createActivity.bookId = actionId 
        }
        else{
            createActivity.orderId = actionId 
        }
        await Activity.create(createActivity)
    }catch(err){
        console.log(err)
        throw err
    }
}