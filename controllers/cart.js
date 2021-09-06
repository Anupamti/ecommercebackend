import Cart from '../models/cartData.js'

export const addtoCart = async (req, res) => {
    const { _id, productTitle, description, image } = req.body
    const productID = _id
    const parentId = req.user._id
    try {
        const existingUser = await Cart.findOne({ productID });

        if (existingUser) return res.status(404).json({ message: "Already Exists " })

        const newcart = new Cart({ productTitle, description, image, parentId, productID })
        await newcart.save()
        console.log(newcart)

        res.status(200).json({ newcart });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ', error });
    }

}

export const getCart = async (req, res) => {
    const parentId = req.user._id

    try {
        const userData = await Cart.find({ parentId });
        res.status(200).json({ userData });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ' });
    }

}

export const removefromCart = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        await Cart.findOneAndDelete(id);
        res.json({ message: " deleted successfully." });

    }
    catch {
        res.json({ message: "Something went wrong" });

    }
}
