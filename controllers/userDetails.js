import UsersData from '../models/userDetails.js'

export const createUser = async (req, res) => {
    const { userName, mobile, email, address } = req.body
    console.log(userName, mobile, email, address)
    const parentId = req.user._id
    try {

        const existingUser = await UsersData.findOne({ email });

        if (existingUser) return res.status(404).json({ message: "UserData Already Exists click on edit to edit it." })

        const newUser = new UsersData({ username: userName, mobile, email, address, parentId })
        // console.log(newUser)
        await newUser.save()
        res.status(200).json({ newUser });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ' });
    }

}

export const getUser = async (req, res) => {
    const parentId = req.user._id

    try {
        const userData = await UsersData.find({ parentId });
        res.status(200).json({ userData });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ' });
    }

}

export const deleteData = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        await UsersData.findOneAndDelete(id);
        res.json({ message: " deleted successfully." });

    }
    catch {
        res.json({ message: "Something went wrong" });

    }
}
