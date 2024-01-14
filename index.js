const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()


const port = process.env.PORT
const server = process.env.HOST

async function dbConnect(){

    await mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Database connection established")
      })
      .catch  ((err)=>{
      console.log(err.message)
      })
      
}
dbConnect()

const buyerSchema = new mongoose.Schema({
    'Name' : String,
    'Email' : String,
    'Phone' : String,
    'date' : Date,
    'Address' : String
})

const Buyers = mongoose.model("Buyer", buyerSchema)



// get buyers
app.get('/buyers',async(req,res)=>{
    try {
        const buyers = await Buyers.find({})  
        res.status(200).json({data:buyers})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


// post route

app.post('/buyers', async(req, res)=>{  
   try {
        const buyerData = req.body;
    const buyer = new Buyers(buyerData);
    buyer.save()
    console.log(buyer);
    res.status(200).json({data : buyer})

  } catch (error) {
    res.status(500).json({ message: error });
  }
})


// get single buyer
app.get('/buyers/:id',async(req,res)=>{
    try {
        const id = req.params.id
        if (!mongoose.isValidObjectId(id) ) {
            return res.status(500).json({message: "Invalid id"})
        }
        const buyer = await Buyers.findOne({_id:id})  


        if (!buyer) {
            return res.status(404).json({message: "buyer not found"})
            
        }
        res.status(200).json({data:buyer})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})



// Delete route

app.delete("/buyers/:id", async(req, res)=>{
    try {
        const id = req.params.id
        if (!mongoose.isValidObjectId(id)) {
            res.status(500).json({message: "Invalid id"})
        }

        const buyer = await Buyers.findByIdAndDelete({_id: id})        
        if (!buyer) {
           return res.status(404).json({message: "the object is not exist"})
        }
            res.status(200).json({message : "buyer is deleted", data: buyer})
        } catch (error) {
        res.status(500).json({message: error})
    }
})

// Update Route

app.put("/buyers/:id", async(req, res)=>{
    const id = req.params.id;
    if (!mongoose.isValidObjectId) {
        res.json({message: "the object id is not valid"})
    }
    const buyerUpdate = req.body

    const buyer = await Buyers.findByIdAndUpdate({_id: id}, buyerUpdate)

    res.status(200).json({message: "Buyer infos updated" , data: buyer})
})


// app.delete("/categories/:id", async (req, res) => {
//     try {
//       const id = req.params.id;
//       if (!mongoose.isValidObjectId(id)) {
//         return res.status(500).json({ message: "Invalid id" });
//       }
  
//       const category = await Categories.findByIdAndDelete({ _id: id });
//       if (!category) {
//         return  res.status(404).json({ message: "Category not found" });
//       }
//       res.status(200).json({ message:"Category deleted",data:category}) 
//     } catch (error) {
//       res.status(500).json({ message: error });
//     }
//   });

app.get('/',(req,res)=>{
    console.log("Connection successfull")
    res.status(200).json({message : "the connection is established and work properly"})

})

app.listen(port, server, ()=>{
    console.log(`server is listening on http://${server}:${port}`)
})







// for users

const userSchema = new mongoose.Schema({
    'name' : String,
    'email' : String,
    'phone' : String,
    'password' : String,
    
})

const Users = mongoose.model("User", userSchema)

// get route for users
app.get('/users',async(req,res)=>{
    try {
        const users = await Users.find({})  
        res.status(200).json({data:users})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


// get route single user

app.get('/users/:id',async(req,res)=>{
    try {
        const id = req.params.id
        if (!mongoose.isValidObjectId(id) ) {
            return res.status(500).json({message: "Invalid id"})
        }
        const user = await Users.findOne({_id:id})  


        if (!user) {
            return res.status(404).json({message: "user not found"})
            
        }
        res.status(200).json({data:user})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

// post route

app.post('/users', async(req, res)=>{  
    try {
         const userData = req.body;
     const user = new Users(userData);
     user.save()
     console.log(user);
     res.status(200).json({data : user})
 
   } catch (error) {
     res.status(500).json({ message: error });
   }
 })
 

// Delete route

app.delete("/users/:id", async(req, res)=>{
    try {
        const id = req.params.id
        if (!mongoose.isValidObjectId(id)) {
            res.status(500).json({message: "Invalid id"})
        }

        const user = await Users.findByIdAndDelete({_id: id})        
        if (!user) {
           return res.status(404).json({message: "the object is not exist"})
        }
            res.status(200).json({message : "buyer is deleted", data: user})
        } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Update Route

app.put("/users/:id", async(req, res)=>{
    const id = req.params.id;
    if (!mongoose.isValidObjectId) {
        res.json({message: "the object id is not valid"})
    }
    const userUpdate = req.body

    const user = await Users.findByIdAndUpdate({_id: id}, userUpdate)

    res.status(200).json({message: "user infos updated" , data: user})
})



// for Reviews

const reviewSchema = new mongoose.Schema({
    'name' : String,
    'contact' : String,
    'email' : String,
    'profession' : String,
    'message' : String
    
})

const Reviews = mongoose.model("review", userSchema)

// get route for users
app.get('/reviews',async(req,res)=>{
    try {
        const reviews = await Reviews.find({})  
        res.status(200).json({data:reviews})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


// get route single user

app.get('/reviews/:id',async(req,res)=>{
    try {
        const id = req.params.id
        if (!mongoose.isValidObjectId(id) ) {
            return res.status(500).json({message: "Invalid id"})
        }
        const review = await Reviews.findOne({_id:id})  


        if (!review) {
            return res.status(404).json({message: "user not found"})
            
        }
        res.status(200).json({data:review})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


// Delete route

app.delete("/reviews/:id", async(req, res)=>{
    try {
        const id = req.params.id
        if (!mongoose.isValidObjectId(id)) {
            res.status(500).json({message: "Invalid id"})
        }

        const reveiw = await Reviews.findByIdAndDelete({_id: id})        
        if (!reveiw) {
           return res.status(404).json({message: "the object is not exist"})
        }
            res.status(200).json({message : "reveiw is deleted", data: reveiw})
        } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// // Update Route

// app.put("/reveiws/:id", async(req, res)=>{
//     const id = req.params.id;
//     if (!mongoose.isValidObjectId) {
//         res.json({message: "the object id is not valid"})
//     }
//     const reveiwUpdate = req.body

//     const user = await Users.findByIdAndUpdate({_id: id}, userUpdate)

//     res.status(200).json({message: "user infos updated" , data: user})
// })