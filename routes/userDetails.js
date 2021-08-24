import express from 'express';
import { createUser, deleteData, getUser } from '../controllers/userDetails.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.post("/createuser", auth, createUser);
router.get("/getuser", auth, getUser);
router.delete("/:id", auth, deleteData);

export default router;