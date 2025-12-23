const asyncHandler = require("express-async-handler");

//@decription Get Goals
//@route      GET /api/goals
//@access     private
const getGoals = asyncHandler(async(req,res) =>{
    res.status(200).json({message : "Get goals "});
})

//Decription  Set new Goals
//@route      POST /api/goals
//@access     private
const setGoal = asyncHandler(async(req,res) => {
    if(!req.body.title){
        res.status(400)
        throw new Error("Please add a title field");
    }
    res.status(201).json({ message : "Set goal "});
})

//Decription  Update a goal
//@route      PUT /api/goals/:id
//@access     private
const UpdateGoal = asyncHandler(async(req,res) => {
    res.status(200).json({ message : `Update Goal : ${req.params.id}`});
})

//Decription  Delete a goal
//@route      Delete /api/goals/:id
//@access     private
const deleteGoal = asyncHandler(async(req,res) => {
    res.status(200).json({ message  : `delete Goal : ${ req.params.id}`});
})

module.exports = {
    getGoals,
    setGoal,
    UpdateGoal,
    deleteGoal,
}