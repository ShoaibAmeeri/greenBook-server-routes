const express = require('express')
const Users = require('../model/user')
const { default: mongoose } = require('mongoose')

const router = express.Router()

// get route for users
router.get('/',async(req,res)=>{
    try {
        const users = await Users.find({})  
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
// get route single user
router.get('/:id',async(req,res)=>{
    try {
        const id = req.params.id
        if (!mongoose.isValidObjectId(id) ) {
            return res.status(500).json({message: "Invalid id"})
        }
        const user = await Users.findOne({_id:id})  


        if (!user) {
            return res.status(404).json({message: "user not found"})
            
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
// post route
router.post('/', async(req, res)=>{  
    try {
      const {name, email,  password } = req.body;
      const err = []
      if (!name) {
        err.push("name is required")
      }
      if (!email) {
          err.push("email is required")
      }
      if (!password) {
          err.push("address no is required")
      }
      if (err.length>0) {
          return res.status(400).json({
              status:"Validation error",
              message : err
          })}
     const user = new Users({email, name, password } );
     user.save()
     
     res.status(200).json({data : user})
 
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 })
// Delete route
router.delete("/:id", async(req, res)=>{
    try {
        const id = req.params.id
        if (!mongoose.isValidObjectId(id)) {
            res.status(500).json({message: "Invalid id"})
        }

        const user = await Users.findByIdAndDelete({_id: id})        
        if (!user) {
           return res.status(404).json({message: "user does not exist"})
        }
            res.status(200).json({message : "user deleted successfully", data: user})
        } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// Update Route
router.patch("/:id", async (req, res) =>{
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
          return res.status(500).json({ message: "Invalid id" });
        }

        const userUpdate=req.body
       const user=  await Users.findByIdAndUpdate({ _id: id }, userUpdate,{new:true})
        res.status(200).json({ message: "user updated",data: user})
    } catch (error) {
        res.status(500).json({ message:error.message });
    }
  })

  module.exports = router