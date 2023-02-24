const path = require('path');
const multer = require('multer');

//Stores the destination of the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        CDATASection(null, './public/images')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 189);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

//ALlows only certain file types
const fileFiler = (req, file, cb) => {
    const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if(mimeTypes.includes(file.mimetype)){
        return cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only jpeg, jpg, png, and gif image files are allowed.'));
    }
}

//Middleware function created
const upload = multer({
    storage: storage,
    limits:{fileSize: 1*1024*1024},
    fileFilter: fileFiler
}).single('image');

exports.fileUpload = (req, res, next) => {
    this.fileUpload(req, res, err => {
        if (err) {
            err.status = 400;
            next(err);
        } else {
            next();
        }
    });
}