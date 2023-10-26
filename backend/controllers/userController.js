import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_JWT_PASS, {expiresIn: '1d'});
}

//login user
const loginUser = async (req,res) => {
    res.json({ mssg: 'login user' });
}

//signup user
const signupUser = async (req,res) => {
    const { username, password } = req.body;

    try {
        const user = await User.signup(username, password);

        //create token 
        const token = createToken(user._id);

        res.status(200).json({ username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
}

export {
    loginUser,
    signupUser,
}