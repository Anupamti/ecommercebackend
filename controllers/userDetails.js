import UsersMovie from '../models/userDetails.js'


export const createUser = async (req, res) => {
    // console.log(req.file)
    const { productTitle, description, seoTitle, seoDesc } = req.body
    // console.log(productTitle, description, seoTitle, seoDesc)
    // language, thumbnail, videofile
    // console.log(movieName, yearRelease)
    const image = req.file.path
    const parentId = req.user._id

    try {
        // const existingUser = await UsersData.findOne({ movieName });

        // if (existingUser) return res.status(404).json({ message: "Movie Already Exists click on edit to edit it." })

        const newUser = new UsersMovie({ productTitle, description, seoTitle, seoDesc, image, parentId })
        await newUser.save()
        console.log(newUser)

        res.status(200).json({ newUser });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ', error });
    }

}

export const getUser = async (req, res) => {
    const parentId = req.user._id

    try {
        const userData = await UsersMovie.find();
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
