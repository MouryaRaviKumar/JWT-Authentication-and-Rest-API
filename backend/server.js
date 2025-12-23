const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const port  = process.env.PORT || 5000;
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");
const goalRoutes = require("./routes/goalRoutes");

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use("/api/goals",goalRoutes);

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})