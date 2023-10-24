import userModel from "../models/coreModel.js";

//login user
const loginUser = async (req,res) => {
    res.json({ mssg: 'login user' });
}

//signup user
const signupUser = async (req,res) => {
    res.json({ mssg: 'signup user' });
}

export {
    loginUser,
    signupUser,
}