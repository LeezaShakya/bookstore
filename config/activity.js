import Activity from "../models/activitylogModel.js";
export default async function activityTracker(action,userId,actionId,description,type) {
    try{
        let createActivity = {
            action: action,
            userId: userId,
            description: description,
        }
        if(type === 'order'){
            createActivity.orderId = actionId
        }
        else{
            createActivity.bookId= actionId
        }
        await Activity.create(createActivity)
    }
    catch(err){
        console.log(err)
        throw err
    }
}