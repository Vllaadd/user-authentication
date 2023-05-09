const User = require("../models/User");

//registration function 
exports.register = async (req, res, next) => {
    const { username, password } = req.body
    if(password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters"})
    }try{
        await User.create({
            username, 
            password,
        }).then(user =>
            res.status(200).json({
                message: "User successfully created",
                user,
            })
            
            )
    }catch(error){
        res.status(401).json({
            message: "User not successfuly created",
            error: error.message,
        })
     }
    }

    exports.loigin = async (req, res, next) => {
        const { username, password } = req.body
        if(!username || !password) {
            return res.status(400).json({
                message: "Username or Password not present",
            })
        }
        try{
            const user = await User.findOne({ username, password })
            if(!user) {
                res.status(401).json({
                    message: "login not successful",
                    error: "User not found",
                })
            }else{
                res.status(200).json({
                    message: "Login successful",
                    user,
                })
            }
        }catch(error){
            res.status(400).json({
                message: "An error occurred",
                error: error.message,
            })
        }
    }
