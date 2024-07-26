const Post = require("../Models/postModel")
const Comment = require("../Models/commentModel")

const createComment = async(req,res)=>{
    try {
        
       const{post,body,user} =req.body;
      const comment = new Comment({post,body,user});
      const saveComment = comment.save()

      const updatePost = await Post.findByIdAndUpdate(post,{$push:{comments:saveComment._id}},{new:true})
                       .populate("comments")
                       .exec()

                       res.status(200).json({
                        success:true,
                        post:updatePost,
                        message:'Comments saved'
                       })

    } catch (error) {
        res.status(200).json({
            success:false,
            post:"Error",
            message:"No comments saved"
        })
        
    }
}

module.exports = createComment;