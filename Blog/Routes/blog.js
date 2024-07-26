const express = require("express")
const route = express.Router()

const createPost = require("../Controllers/postController")
const createComment = require("../Controllers/commentController")
const createLike = require("../Controllers/likeController")
const createUnlike = require("../Controllers/likeController")


route.post("/createPost",createPost)
route.post("/createComment",createComment)
route.post("/createLike",createLike)
route.post("/createUnlike",createUnlike)


module.exports = route
