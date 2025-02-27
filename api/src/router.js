
const router = require('express').Router()
const multer = require('multer');

const filename = (request, file, callback) => {
    callback(null, file.originalname);
};

const fileFilter = (request, file, callback) => {
    if (file.mimetype !== 'image/png') {
        request.fileValidationError = 'Wrong file type';
        callback(null, false, new Error('Wrong file type'));

    } else {
        callback(null, true);
    }
};

const storage = multer.diskStorage({
    destination: 'api/uploads/',
    filename: filename
})


const upload = multer({
    fileFilter: fileFilter,
    storage: storage
});

router.post('/upload', upload.single('photo'), (req, res) => {
   if (req.fileValidationError) {
       return res.status(400).json({
           error: req.fileValidationError
       });
   }

   return res.status(201).json({
       success: true
   })
});

module.exports = router