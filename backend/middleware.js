const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./config")

const authMiddleware = (req,res,next) => {
    const token = req.headers.authorization;

    if(!token || !token.startsWith('Bearer')){
        return res.status(403).json({
            msg: "Invalid token format"
        })
    }

    const jwtToken = token.spilt(' ')[1];
    try{
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        console.log(decodedValue)

        if(req.userId = decoded.userId && decodedValue.username && decodedValue.password){
            req.userId = decodedValue.userId
            req.username = decodedValue.username
            req.password = decodedValue.password
            next();
        }
        else{
            res.status(403).json({
                msg: "User doesn't exists"
            })
        }
    }
    catch(err){
        return res.status(403).json({
            msg: "Unauthorized user",
            error: err.message
        })
    }
}

module.exports = authMiddleware