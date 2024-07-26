const Post = require("../Models/postModel")
const Like = require("../Models/likeModel")

const createLike = async(req,res)=>{
    try {
        const{user,post} = req.body;
        const like = new Like({
            user,post
        })
        const saveLike =  like.save()
        const updatePost = await Post.findByIdAndUpdate(post,{$push:{likes:saveLike._id}},{new:true})
                           .populate("likes")
                           .exec()

                res.status(200).json({
                    success:true,
                    post:updatePost,
                    message:"Post is liked"
                })           
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            post:"No likes",
            message:"issues"
        })
    }
}

module.exports = createLike;

const createUnlike = async(req,res) =>{
    try {
        
        const{post,like} =req.body;
        const id = req.params.id
        const deleteLike = await Like.findByIdAndDelete({_id:id})

        const updatePost = await Post.findByIdAndDelete(post,{$pull:{like:deleteLike._id}},{new:true})

        res.json({
            post:updatePost,
        })


    } catch (error) {
     console.log(error)
        
    }
}

module.exports = createUnlike;