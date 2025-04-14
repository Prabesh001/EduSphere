const jwt = require("jsonwebtoken")
// const promisify = require("util").promisify


exports.decodeToken = async (token,secret)=>{
    const decryptedResult = await promisify(jwt.verify)(token,secret)
    return decryptedResult
}