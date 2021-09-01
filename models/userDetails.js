import mongoose from "mongoose";

const UserdataMovie = mongoose.Schema({
    productTitle: { type: String, required: true },
    description: { type: String, required: true },
    // language: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    seoTitle: { type: String, required: true },
    seoDesc: { type: String, required: true },

})

const UsersMovie = mongoose.model('UsersMovie', UserdataMovie);
export default UsersMovie