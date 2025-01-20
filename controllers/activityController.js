import Activity from "../models/activitylogModel.js";
export const GetAllActivity = async (req, res) => {
    try {
      let activity = await Activity.find();
      if (activity.length === 0) {
        return res.status(400).json({ error: "No Activity Recorded" });
      }
      res.status(200).json({ data: activity });
    } catch (err) {
      res.status(500).json({
        msg: "Something went wrong",
        error: err.message,
      });
    }
  };