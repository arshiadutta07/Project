const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth-middleware');
const {blogDetails, userIdentity} = require('../Validations/validation');
const {createBlogPost, getAllBlogPost, updateBlog, deleteBlog} = require('../RoutesManagement/blog-management');

//Create Blog
router.post("/createBlog",auth, async(req, res) => {
    let result = {};
    try {
        let isValidInfo = blogDetails.validate(req.body);
        if(isValidInfo.error) {
            result.validationError = `Blog details are not valid - ${isValidInfo.error.message}`;
            res.status(400).send(result);
        }
        else {
            let object = await createBlogPost(req.body);
            result.data = object.data;
            res.status(200).send(result);
        }
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

//Get All Blogs of a particular User
router.get("/getAllBlogs/:userId",auth, async(req, res) => {
    let result = {};
    try {
        let isValidInfo = userIdentity.validate(req.params.userId);
        if(isValidInfo.error) {
            result.validationError = `User Id not Present- ${isValidInfo.error.message}`;
            res.status(400).send(result);
        }
        else {
            let object = await getAllBlogPost(req.params.userId);
            result.data = object.data;
            if(!object.success) {                
                res.status(404).send(result);
            }
            else {
                res.status(200).send(result);
            }
        }
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

//Update a Blog
router.put("/updateBlog/:blogId",auth, async(req, res) => {
    let result = {};
    try {
        let isValidBlogId = userIdentity.validate(req.params.blogId);
        let isValidBlogPost = blogDetails.validate(req.body);

        if(isValidBlogId.error || isValidBlogPost.error) {
            result.validationError = `Missing Data from client side - ${isValidInfo.error.message}`;
            res.status(400).send(result);
        }
        else {
            let object = await updateBlog(req.params.blogId, req.body);
            result.data = object.data;
            if(!object.success) {                
                res.status(404).send(result);
            }
            else {
                res.status(200).send(result);
            }
        }
    }
    catch(ex) {
        console.log(ex);
        result.error = `Internal Server Error - ${ex.message ? ex.message : ex}`;
        res.status(500).send(result);
    }
})

//Delete a Blog
router.delete("/deleteBlog/:userId/:blogId",auth, async(req, res) => {
    let result = {};
    try {
        let isValidUserId = userIdentity.validate(req.params.userId);
        let isValidBlogId = userIdentity.validate(req.params.blogId);

        if(isValidUserId.error || isValidBlogId.error) {
            result.validationError = `Missing Data from client side - ${isValidInfo.error.message}`;
            res.status(400).send(result);
        }
        else {
            let object = await deleteBlog(req.params.userId, req.params.blogId);
            result.data = object.data;
            if(!object.success) {                
                res.status(404).send(result);
            }
            else {
                res.status(200).send(result);
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