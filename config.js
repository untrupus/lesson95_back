const path = require("path");
const {nanoid} = require('nanoid');
const multer = require('multer');

const rootPath = __dirname;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  path.join(rootPath, 'public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
})

const upload = multer({storage});

module.exports = {
    upload,
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    db: {
        name: "cocktails",
        url: "mongodb://localhost"
    },
    fb: {
        appId: '1275959742777184',
        appSecret: '84d6c2e67d66fd8f3e3e7e169949dc12'
    }
};