const multer = require('multer')
const fs = require('fs')
const path = require('path')



const uploadFile = async(req, res, next) => {
    const date = new Date().valueOf()
    try {
        if (!req.file) {
            return res.status(400).json({message: "no file is attached"})
        }
        
        const tempFilePath = path.join(__dirname, '../uploads/', req.file.originalname)
        console.log(tempFilePath)
        fs.writeFileSync(tempFilePath, req.file.buffer)
        console.log("file has been uploaded")
        const newPath = req.file.originalname.split(".")['1']
        
        req.body.filePath = 'uploads/'+date+'.'+newPath
        next()
    } catch (error) {
        res.status(500).json({error: error.message})
        console.log(error)
    }
}

module.exports= {uploadFile}