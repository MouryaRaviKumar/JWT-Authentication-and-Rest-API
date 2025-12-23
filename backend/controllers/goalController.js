const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalsModel");
const User = require("../models/userModel");

//@decription Get Goals
//@route      GET /api/goals
//@access     private
const getGoals = asyncHandler(async(req,res) =>{

    const allGoals = await Goal.find({ user : req.user.id });

    res.status(200).json(allGoals);
})

//Decription  Set new Goals
//@route      POST /api/goals
//@access     private
const setGoal = asyncHandler(async(req,res) => {

    if(!req.body.title){
        res.status(400)
        throw new Error("Please add a title field");
    }

    const goal = await Goal.create({
        title : req.body.title,
        user : req.user.id,
    })

    res.status(201).json(goal);
})

//Decription  Update a goal
//@route      PUT /api/goals/:id
//@access     private
const UpdateGoal = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error("Goal Not found")
    }

    const user = User.findById(req.user.id);
    //Check the user
    if(!user){
        res.status(401)
        throw new Error(" User not found");
    }

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error(" User not Authorized");
    }
    
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body, { new : true});
    res.status(200).json(updatedGoal);
})

//Decription  Delete a goal
//@route      Delete /api/goals/:id
//@access     private
const deleteGoal = asyncHandler(async(req,res) => {
    const deletedGoal = await Goal.findById(req.params.id);

    if(!deletedGoal){
        res.status(400)
        throw new Error("Goal Not found")
    }

    const user = User.findById(req.user.id);
    //Check the user
    if(!user){
        res.status(401)
        throw new Error(" User not found");
    }

    if(deletedGoal.user.toString() !== user.id){
        res.status(401)
        throw new Error(" User not Authorized");
    }
    
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedGoal);
})

module.exports = {
    getGoals,
    setGoal,
    UpdateGoal,
    deleteGoal,
}