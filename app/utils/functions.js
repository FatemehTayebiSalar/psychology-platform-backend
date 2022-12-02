const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/user");
const { SECRET_KEY } = require("./constants");

function randomNumberGenerator(){
    return Math.floor((Math.random()*90000)+10000)

}
function signAccessToken(userId){
    return new Promise(async (resolve,reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile : user.mobile,
            userID : user._id
        };
        const secret = "";
        const options = {
            expiresIn : "2h"
        };
        JWT.sign(payload,SECRET_KEY,options, (err, token) => {
            if(err) reject(createError.InternalServerError("خطای سروری"))
            resolve(token)
        })
    })
}
module.exports = {
    randomNumberGenerator,
    signAccessToken
}