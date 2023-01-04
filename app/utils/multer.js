const multer = require("multer");
const path = require("path")
const fs = require("fs");
const createError = require("http-errors");
function createRoute (req){
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();
    const directory = path.join(__dirname , "..","..","public", "uploads" , "podcast", year,month,day)
    req.body.fileUploadPath = path.join( "uploads" , "podcast", year,month,day);
    fs.mkdirSync(directory, {recursive : true})
    return directory
}
const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        if(file?.originalname){
            const filePath = createRoute(req);
            return cb(null , filePath)
        }
        cb(null, null)
    },
    filename : (req,file,cb) => {
        if(file.originalname){
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext)
            req.body.filename = fileName
            return cb(null , fileName)
        }
        cb(null, null)
    }
});
function pictureFilter(req,file,cb){
    const ext = path.extname(file.originalname);
    const mimtypes = [".jpg",".jpeg",".png",".webp",".gif"];
    if(mimtypes.includes(ext)){
        return cb(null, true)
    }
    return cb(createError.BadRequest("فرمت ارسال شده ی تصویر صحیح نمی باشد"))
}

function fileFilter(req,file,cb){
    const {modelName} = req.params;
    const ext = path.extname(file.originalname);
    let mimtypes;
    if(modelName == "video") mimtypes = [".mp4",".mpg",".mov",".avi",".mkv"];
    else if(modelName == "podcast") mimtypes = [".mp3",".aac",".flac",".alac",".wav"];
    if(mimtypes.includes(ext)){
        return cb(null, true)
    }
    return cb(createError.BadRequest("فرمت ارسال شده ی فایل صحیح نمی باشد"))
}


const pictureMaxSize = 4 * 1000 * 1000 ;//4MB
const fileMaxSize = 300 * 1000 * 1000 ;//300MB

const uploadPicture = multer({storage , pictureFilter , limits : {fileSize : pictureMaxSize}});
const uploadFile = multer({storage , fileFilter , limits : {fileSize : fileMaxSize}});

module.exports = {
    uploadPicture,
    uploadFile
}