const UserDetails = require('../Collections/userDetails');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
let userModel = require("../Collections/userDetails");
require('dotenv').config();

//SignUp Management Functions
let checkUserExists = function(email) {
    return new Promise(async function(resolve, reject) {
        try {
            let res = await userModel.findOne({email});
            if(res) {
                resolve(res);
            }
            else {
                resolve(res);
            }
        }
        catch(ex) {
            reject(ex);
        }
    })
}

let createNewUser = function(user) {
    return new Promise(async function(resolve, reject) {
        try {
            let pass = await hashPassword(user.password);
            user.password = pass;
            delete user.repeatPassword;
            let result = await userModel.create(user);
            resolve({success: true, data : result});
        }
        catch(ex) {
            reject(ex);
        }
    })
}

function hashPassword(pass) {
    return new Promise(async function(resolve, reject) {
        try {
            let result = await bcrypt.hash(pass, 10);
            resolve(result);   
        }
        catch(ex) {
            reject(ex);
        }
    })
}

//Login Management Functions
let checkUserPassword = function(userPass, hashPass) {
    return new Promise(async function(resolve, reject) {
        try {
            let result = await bcrypt.compare(userPass, hashPass);
            resolve(result); 
        }
        catch(ex) {
            reject(ex);
        }
    })
}

//Generate Token 
let generateToken = function(user) {
    try {
        let secretKey = process.env.JWT_SECRET_KEY;
        let userInfo = {
            id : user._id,
            username : user.username
        }
        let token = jwt.sign(userInfo, secretKey, { expiresIn: '15m' });
        return token;
    }
    catch(ex) {
        throw new Error("Error in Generating Token");
    }
}

module.exports = {
    checkUserExists,
    createNewUser,
    checkUserPassword,
    generateToken
}