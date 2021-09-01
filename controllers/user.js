import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Users from '../models/userCredentials.js'
import dotenv from 'dotenv'

dotenv.config()

const { JWT_SECRET } = process.env

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Users.findOne({ email });

        if (!existingUser)
            return res.status(404).json({ message: " User does not exist ." })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, JWT_SECRET, { expiresIn: "1day" })

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong ' });
    }
}

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;
    console.log(email, password, confirmPassword, firstName, lastName,)

    try {
        const existingUser = await Users.findOne({ email });

        if (existingUser) return res.status(404).json({ message: "User Already Exists." })

        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match" });

        const hashedPassword = await bcrypt.hash(password, 12);
        console.log(hashedPassword)

        const newUser = new Users({ name: firstName + " " + lastName, email, password: hashedPassword })
        console.log(newUser)
        await newUser.save()

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, JWT_SECRET, { expiresIn: "1day" })

        res.status(200).json({ newUser, token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong ' });
    }

}