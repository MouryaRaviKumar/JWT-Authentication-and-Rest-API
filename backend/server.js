const express = require("express");
const dotenv = require("dotenv").config();
// const colors = require("colors");
const port  = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const goalRoutes = require("./routes/goalRoutes");
const { connectDB } = require("./config/db");

connectDB();
const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use("/api/goals",goalRoutes);

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})