const express = require('express')
const router = new express.Router()
const multer = require('multer')
const {writeDataInExcel} = require('../controller/customer')

const storage = multer.diskStorage({
    destination : 'jsons',
    filename: function (request, file, callBack) {
        callBack(null, 'json.json')
  },
  fileFilter(request,file,callBack){
    if (!file.originalname.match(/\.(json)$/)) {
        return callBack(new Error ('file must be in Json formet'))
    }
    callBack(undefined, true)
}
})

const upload = multer({ storage: storage })

// upload the json file
router.post('/customer/details/upload', upload.single('json'), async(req,res)=>{
    try{
        writeDataInExcel()
        res.send("excel file created.").status(200)
    }
    catch(error){
        console.log(error)
        res.send(error).status(500)
    }
})

module.exports = router