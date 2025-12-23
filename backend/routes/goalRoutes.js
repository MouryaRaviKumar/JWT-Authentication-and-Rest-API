const express = require("express");
const router = express.Router();
const  {getGoals,setGoal,UpdateGoal,deleteGoal} = require('../controllers/goalController');

router.route("/").get(getGoals).post(setGoal);

router.route("/:id").put(UpdateGoal).delete(deleteGoal);

module.exports = router;