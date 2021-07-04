import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'

//@desc Auth user & get token
//@Route POST /api/users/login
//@access Public
const authUser = asyncHandler( async(req , res) => {
    const {email , password} = req.body
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password)) ){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
})

//@desc Register a new user
//@Route POST /api/users
//@access public
const registerUser = asyncHandler( async(req , res) => {
    const { name , email , password } = req.body
    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({name , email , password})

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

//@desc Get user profile
//@Route get /api/users/profile
//@access Private
const getUserProfile = asyncHandler( async(req , res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }
    else {
        res.status(401)
        throw new Error('User Not Found')
    }
})

//@desc Update user profile
//@Route Put /api/users/profile
//@access Private
const UpdateUserProfile = asyncHandler( async(req , res) => {
    const user = await User.findById(req.user._id)

    if(user){
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if(req.body.password) {
          user.password = req.body.password
      }
      const updateUser = await user.save();

      res.json({_id:user._id,
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin,
            token: generateToken(updateUser._id)
      })
    }

    else {
        res.status(401)
        throw new Error('User Not Found')
    }
})



export { authUser , getUserProfile , registerUser , UpdateUserProfile}