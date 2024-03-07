const express = require('express');
const router = express.Router();
const {userSchema} = require('../Validations/validation');
const {checkUserExists, createNewUser} = require('../RoutesManagement/signUp-login-management');

//Register a User
router.post("/register", async(req, res) => {
    let result = {};
    try {
        let isValidInfo = userSchema.validate(req.body);
        if(isValidInfo.error) {
            result.validationError = "User Data is not valid";
            res.status(400).send(result);
        }
        else {
           let user = await checkUserExists(req.body.email);
           if(!user) {
                let object = await createNewUser(req.body);
                result.data = object.data;
                res.status(200).json(result);
           }
           else {
            result.data = "User Already Exists";
            res.status(409).send(result);
           }
        }
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

module.exports = router;