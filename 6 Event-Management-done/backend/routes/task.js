const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");

// Create Task
router.post("/create-task", async (req, res) => {
  try {
    const { title, desc,  date, location,  maxAttendees, imgUrl } = req.body;
    const { id } = req.headers;
    const newTask = new Task({ title, desc ,date, location, maxAttendees, imgUrl});
    const saveTask = await newTask.save();
    const taskId = saveTask._id;
    await User.findOneAndUpdate(
      { _id: id }, 
      { $push: { tasks: taskId } } 
    );
    res.status(200).json({ message: "Task Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" }); 
  }
});


// Get All Tasks
router.get("/get-all-tasks", async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Delete Task
router.delete("/delete-tasks/:id", async  (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Update Task
router.put("/update-tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc,date, location, maxAttendees, imgUrl } = req.body;
    await Task.findByIdAndUpdate(id, { title:title, desc:desc, date:date, location:location, maxAttendees:maxAttendees, imgUrl:imgUrl });
    res.status(200).json({ message: "Task Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Update Important Task
router.put("/update-imp-tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const ImpTask = TaskData.important;
    await Task.findByIdAndUpdate(id, {important: !ImpTask});
    res.status(200).json({message: "Task Update Successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Update Complete Task
router.put("/update-complete-tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const CompleteTask = TaskData.complete;
    await Task.findByIdAndUpdate(id, {complete: !CompleteTask});
    res.status(200).json({message: "Task Update Successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Get Completed Tasks
router.get("/get-complete-tasks", async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    const CompTaskData = Data.tasks
    res.status(200).json({ data: CompTaskData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Get Incomplete Tasks
router.get("/get-incomplete-tasks", async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: false },
      options: { sort: { createdAt: -1 } },
    });
    const CompTaskData = Data.tasks
    res.status(200).json({ data: CompTaskData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;

