const Post = require("../Models/postModel")

const createPost = async(req,res)=>{
    try {
        
        const{title,description} = req.body;

        const post = new Post({
            title,description
        })
        const savedPost = post.save()

        res.json({
            post:savedPost
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = createPost;