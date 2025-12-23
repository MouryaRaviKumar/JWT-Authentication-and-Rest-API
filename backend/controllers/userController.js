const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Decription  Create new Users
//@route      POST /api/users
//@access     public
const registerUser = asyncHandler(async(req,res)=>{
    const { name , email , password } = req.body;
    //check whether the fields are filled
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Fill all required Fields");
    }
    //Check whether the user already exists
    const UserExists = await User.findOne({email});
    if(UserExists){
        res.status(400)
        throw new Error("User already exists");
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({
        name ,
        email,
        password : hashedPassword
    });

    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email :user.email,
            token : generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error("Invalid User Data");
    }
});


//Decription  Authenticate  User
//@route      POST /api/users/login
//@access     public
const loginUser = asyncHandler(async(req,res)=>{
    const { email , password } = req.body;
    //check whether the fields are filled
    if(!email || !password){
        res.status(400)
        throw new Error("Enter Both email and password");
    }
    const user = await User.findOne({email});
    //verify the password with the stored password
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email :user.email,
            token : generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error("Invalid Credentials");
    }
});


//Decription  Get user Data
//@route      GET /api/users/me
//@access     private
const getMe = asyncHandler(async(req,res)=>{
    const { _id , name , email } = await User.findById(req.user.id);
    res.status(200).json({
        _id,
        name,
        email,
    })

});


//Generate a JWT Token
const generateToken = (id) => {
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn : '30d',
    })
};

module.exports = { registerUser , loginUser , getMe}