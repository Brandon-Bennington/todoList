const ListItem = require('../models/TodoList');

async function createTask(req, res, next) {
  try {
    const name  = req.body.name ;
    const description = req.body.description;
    const newListItem = new ListItem({
        name,
        description
    });
    const savedData =  await newListItem.save();
    res.json({
        success: true,
        blogs: savedData
    });

  } catch (e) {
    console.log(typeof e);
    console.log(e);
    res.json({
      error: e.toString(),
    });
  }
}

async function getAllTasks(req, res){
      try {
        const listItems = await ListItem.find({});
        res.json({listItems: listItems });
      }catch(e){
        console.log(e);
      }
}

async function getOneTask(req, res){
  try {
    const listItems = await ListItem.find({name:req.params.name});
    res.json({listItems: listItems });
  }catch(e){
    console.log(e);
  }
}

async function updateOneTask(req,res){
  try {
    const updates = {
      status: req.body.status

    }
    if(req.body.status === "complete"){
      updates.dateCompleted = Date.now();
      updates.completed = true;
    }

    await ListItem.updateOne({ name:req.params.name }, updates);
    res.json({success: true, updates: res.body});

  }catch(e){
    console.log(e);

  }
}

async function deleteOneTask(req,res){
  try {
      await ListItem.deleteOne({name:req.params.name});
  } catch (err) {
      console.log(err);
      throw err;  
  }

  res.json({
      success: true,
      message: `List item deleted.`
  })
}
  module.exports = {
    createTask,
    getAllTasks,
    getOneTask,
    updateOneTask,
    deleteOneTask
  };