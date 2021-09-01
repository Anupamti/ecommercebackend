import express from 'express';
import { createUser, deleteData, getUser } from '../controllers/userDetails.js'
import auth from '../middleware/auth.js'
const router = express.Router();
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '-' + file.originalname);
        // for mac users can change 
        // new Date ().toDateString

    }
});

const fileFilter = (req, file, cb) => {
    // reject a file 
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).single('image')

// const videoStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (request, videofile, cb) {
//         console.log(videofile);
//         cb(null, new Date().getTime() + '-' + videofile.originalname)
//     }
// });

// const uploadvideo = multer({ storage: videoStorage }).single('video')

router.post("/createuser", auth, upload, createUser);
router.get("/getuser", auth, getUser);
router.delete("/:id", auth, deleteData);

export default router;