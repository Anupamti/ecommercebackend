import express from 'express';
import { addtoCart, getCart, removefromCart } from '../controllers/cart.js';

import auth from '../middleware/auth.js'
const router = express.Router();

router.post("/addtocart", auth, addtoCart);
router.get("/getcart", auth, getCart);
router.delete("/removefromcart", auth, removefromCart);

export default router;