const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
let userBlog = require('../Collections/blogPost');
let userModel = require("../Collections/userDetails");

let createBlogPost = function(blogPost) {
    return new Promise(async function(resolve, reject) {
        try {
            let result = await userBlog.create(blogPost);
            if(result) {
                resolve({success : true, data : result});
            }
            else {
                reject("Issue in creating Blog Data");
            };
        }
        catch(ex) {
            reject(ex);
        }
    })
}

let getAllBlogPost = function(userId) {
    return new Promise(async function(resolve, reject) {
        try {
            let user = await userModel.findOne({_id : new ObjectId(userId)});
            if(user) {
                let result = await userBlog.find({userId});
                let updatedUser = { ...user.toObject(), blogs: result };
                resolve({success : true, data : updatedUser});
            }
            else {
                resolve({success : false, data : "User Does'nt exists."});
            };
        }
        catch(ex) {
            reject(ex);
        }
    })
}

let updateBlog = function(blogId, updatedBlog) {
    return new Promise(async function(resolve, reject) {
        try {
            let user = await userModel.findOne({_id : new ObjectId(updatedBlog.userId)});
            let blog = await userBlog.findOne({_id : new ObjectId(blogId)});

            if(user && blog) {
                await userBlog.updateOne({_id : blogId, userId : updatedBlog.userId}, { $set: updatedBlog });
                resolve({success : true, data : "User Updated Successfully!"});
            }
            else {
                resolve({success : false, data : "Can't Update because user or blog does'nt exists."});
            }           
        }
        catch(ex) {
            reject(ex);
        }
    })
}

let deleteBlog = function(userId, blogId) {
    return new Promise(async function(resolve, reject) {
        try {
            let user = await userModel.findOne({_id : new ObjectId(userId)});
            let blog = await userBlog.findOne({_id : new ObjectId(blogId)});

            if(user && blog) {
                await userBlog.deleteOne({_id : blogId, userId : userId});
                resolve({success : true, data : "User Deleted Successfully!"});
            }
            else {
                resolve({success : false, data : "Can't delete because user or blog does'nt exists."});
            }           
        }
        catch(ex) {
            reject(ex);
        }
    })
}

module.exports = {
    createBlogPost,
    getAllBlogPost,
    updateBlog,
    deleteBlog
}