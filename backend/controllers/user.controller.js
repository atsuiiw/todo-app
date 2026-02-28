import { User } from "../models/user.model.js"

const registerUser = async (req,res) => {
    try{
        const {username, email, password} = req.body;

        // validation
        if(!username || !email || !password) return res.status(400).json({
            message : "Important fields not filled"
        });

        // check if user existed
        const existing = await User.findOne({ email: email.toLowerCase() });
        if(existing) return res.status(400).json({
            message : "User existed"
        });

        // creating user
        const user = await User.create({
            username,
            email : email.toLowerCase(),
            password,
            loggedIn: false
        });

        res.status(201).json({
            message : "User Registered",
            user: {id : user._id, email: user.email, username: user.username}
        });
    } catch(error){
        res.status(500).json({
            message : "Internal server error",
            error: error.message
        });
    }
}

const loginUser = async (req,res) =>{
    try{
        // checking if user existed
        const { email, password } = req.body;
        
        // check email
        const user = await User.findOne({
            email : email.toLowerCase()
        });

        if(!user) return res.status(400).json({
            message : "User not found"
        });

        // comparing password
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message : "Invalid credentials"
        });

        res.status(200).json({
            message : "Login successful",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch(error){
        res.status(500).json({
            message: "Internal server error",
            error : error.message
        })
        console.log(error)
    }
}

const logoutUser = async ( req,res ) =>{
    try{
        const {email} = req.body;

        // check email
        const user = await User.findOne({
            email: email
        })
        if(!user) return res.status(404).json({
            message: "No email found"
        });

        res.status(200).json({
            message: "Logout succesfully"
        });
    } catch(error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
}