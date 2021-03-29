const express = require("express")
const requireLogin = require("../middleware/requireLogin")
const router = express.Router()
const Post = require("../models/post")


router.post("/createPost",requireLogin,(req,res)=>{
    const {title,body,user,photo}= req.body
    if(!title ||!body){
        return res.status(422).json({error:"please add all the feilds"})
    }
    const post = new Post({
        title,
        body,
        postedBy:req.user._id,
        photo
    })
    post.save((err,post)=>{
        if(err){
            return res.status(400).json({error:"some error occured"})
        }
        res.json(post)
    })
})



router.get("/allPost",requireLogin,(req,res)=>{

    Post.find().populate("postedBy","_id name").populate("comments.postedBy","id name").exec((err,posts)=>{
        if(err || !posts){
            return res.status(400).json({error:"some error occured"})
        }
        res.json(posts)
    })

})


router.get("/myPost",requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id}).populate("postedBy","_id name").exec((err,posts)=>{
        if(err || !posts){
            return res.status(400).json({error:"some error occured"})
        }
        res.json(posts)
    })
})


router.put('/like',requireLogin,(req,res)=>{
   
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({
                error:err
            })
        }
        res.json(result)
    })
})
router.put('/unlike',requireLogin,(req,res)=>{ 
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({
                error:err
            })
        }
        res.json(result)
    })
})


router.put('/comment',requireLogin,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name").exec((err,result)=>{
        if(err){
            return res.status(422).json({
                error:err
            })
        }
        res.json(result)
    })
})


module.exports = router