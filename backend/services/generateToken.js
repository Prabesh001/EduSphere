const jwt = require("jsonwebtoken")
const generateToken  = (user)=>{
    return jwt.sign({id:user.id,role : user.role},"haha",{
        expiresIn : '2d'
     })
}


module.exports = generateToken