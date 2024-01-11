const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose');


const port = 8000
const server = 'localhost'

async function dbConnect(){

    await mongoose.connect('mongodb://127.0.0.1:27017/GreenBook').then(()=>{
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



const useerSchema = new mongoose.Schema({
    'name' : String,
    'username' : String,
    'email' : String,
    'phone' : String,
    'date' : Date,
    'id': Number,
    'Address' : Object
})

const Users = mongoose.model("User", useerSchema)
