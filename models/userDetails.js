import mongoose from "mongoose";

const UserdataSchema = mongoose.Schema({
    username: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    parentId: { type: String, required: true },
    id: { type: String }
})

const UsersData = mongoose.model('UsersData', UserdataSchema);
export default UsersData