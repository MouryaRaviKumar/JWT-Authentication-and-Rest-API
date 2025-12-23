const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port  = 8080;
require("dotenv").config();



app.listen(port,(req,res)=>{
    console.log(`Server running on port ${port}`);
})