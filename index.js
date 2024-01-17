const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require("dotenv")
const app = express()
app.use(express.json())
app.use(morgan("combined"))
app.use(cors())
dotenv.config()




// -----------------------------DB connection---------------------------------------------

const port = process.env.PORT || 8000
const server = process.env.HOST || 'localhost'

async function dbConnect(){
    await mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Database connection established")
      })
      .catch  ((err)=>{
      console.log(err.message)
      })     
}
dbConnect()



// -------------------------------------------Buyers Route------------------------------

const buyerSchema = new mongoose.Schema({
    'name' : String,
    'email' : String,
    'phone' : String,
    'date' : Date,
    'address' : String
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
        const {email, name, phone, address} = req.body;
        const err = []
        if (!name) {
          err.push("nameis required")
        }
        if (!email) {
            err.push("email is required")
        }
        if (!phone) {
            err.push("phone no is required")
        }
        if (!address) {
            err.push("address no is required")
        }
        if (err.length > 0) {
            return res.status(400).json({
                status:"Validation error",
                message : err
            })}
            
    const buyer = new Buyers({email, name, phone, address});
    buyer.save()    
    res.status(200).json({data : buyer})
  } catch (error) {
    res.status(500).json({ message: error.message });
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
app.patch("/buyers/:id", async (req, res) =>{
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
          return res.status(500).json({ message: "Invalid id" });
        }

        const buyerUpdate=req.body
       const buyer=  await Buyers.findByIdAndUpdate({ _id: id }, buyerUpdate,{new:true})
        res.status(200).json({ message: "Category updated",data: buyer})
    } catch (error) {
        res.status(500).json({ message:error.message });
    }
  })








  //--------------------------------------------------------- for users---------------------------------
  
  const userSchema = new mongoose.Schema({
      'name' : String,
      'email' : String,
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
        if (err) {
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
  app.patch("/users/:id", async (req, res) =>{
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






    
    // ----------------------------------for Reviews----------------------------------------------
    
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
    // post route
  app.post('/reviews', async(req, res)=>{  
    try {
         const {name , email, message } = req.body;

         const err = []
         if (!name) {
            err.push("name is required")            
         }
         if(!email){
            err.push("email is required")
         }
         if (!message) {
            err.push("your message is required")
         }

         if (err.length > 0) {
            res.status(400).json({
                status : "validation error",
                message : err
            })
         }

     const review = new Reviews(reviewData);
     review.save()
     
     res.status(200).json({data : review})
 
   } catch (error) {
     res.status(500).json({ message: error });
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
    // Update Route
    app.patch("/reveiws/:id", async (req, res) =>{
        try {
            const id = req.params.id;
            if (!mongoose.isValidObjectId(id)) {
              return res.status(500).json({ message: "Invalid id" });
            }
            const reviewUpdate=req.body
            const review=  await Reviews.findByIdAndUpdate({ _id: id }, reviewUpdate,{new:true})
            res.status(200).json({ message: "user updated",data: review})
        } catch (error) {
            res.status(500).json({ message:error.message });
        }
      })





    // ------------------------------Base uri reponse------------------------------------------

app.get('/',(req,res)=>{
    console.log("Connection successfull")
    res.status(200).json({message : "the connection is established and work properly"})

})

app.listen(port, server, ()=>{
    console.log(`server is listening on http://${server}:${port}`)
})








