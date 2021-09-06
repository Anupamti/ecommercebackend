import mongoose from "mongoose";

const CartData = mongoose.Schema({
    productTitle: { type: String, required: true },
    description: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    productID: { type: String, required: true },
    parentId: { type: String, required: true },

})

const Cart = mongoose.model('Cart', CartData);
export default Cart