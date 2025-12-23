const express = require("express");
const router = express.Router();
const  {getGoals,setGoal,UpdateGoal,deleteGoal} = require('../controllers/goalController');

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect,getGoals).post(protect,setGoal);

router.route("/:id").put(protect,UpdateGoal).delete(protect,deleteGoal);

module.exports = router;