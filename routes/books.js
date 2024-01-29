const express = require("express");
const { getBook, getBooks, createBook } = require("../controler/books");

const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBook);


// post route

// Delete route
// router.delete("/books/:id", async(req, res)=>{
//     try {
//         const id = req.params.id
//         if (!mongoose.isValidObjectId(id)) {
//             res.status(500).json({message: "Invalid id"})
//         }

//         const book = await Books.findByIdAndDelete({_id: id})
//         if (!book) {
//            return res.status(404).json({message: "the book  does not exist"})
//         }
//             res.status(200).json({message : "book is deleted", data: book})
//         } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })
// Update Route
// app.patch("/reveiws/:id", async (req, res) =>{
//     try {
//         const id = req.params.id;
//         if (!mongoose.isValidObjectId(id)) {
//           return res.status(500).json({ message: "Invalid id" });
//         }
//         const reviewUpdate=req.body
//         const review=  await Reviews.findByIdAndUpdate({ _id: id }, reviewUpdate,{new:true})
//         res.status(200).json({ message: "user updated",data: review})
//     } catch (error) {
//         res.status(500).json({ message:error.message });
//     }
//   })

// //----------------------------------Base uri reponse------------------------------------------

module.exports = router;
