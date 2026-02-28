import { Post } from "../models/post.model.js";

// create a post
const createPost = async (req,res) =>{
    try{
        const { name, description, age } = req.body;
        
        // check valid
        if(!name || !description || !age) return res.status(404).json({
            message: "All fields are required"
        });

        const post = await Post.create({name, description, age});

        res.status(200).json({
            message: "Post Created Successfully",
            post: post
        })
    } catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const getPost = async (req,res) =>{
    try{
        const getPosts = await Post.find();
        res.status(200).json(getPosts)
    } catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const updatePost = async (req,res) => {
    try{
        // validation to check if body is empty
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message: "No update"
            });
        }

        const post = await Post.findByIdAndUpdate(req.params.id,req.body, {new:true});

        if(!post) return res.status(404).json({
            message: "Post not found"
        });

        res.status(200).json({
            message: "Post updated successfully", post
        });

    } catch(error){
        res.status(500).json({
            message: "Internal server error", error
        });
    }
}

const deletePost = async (req,res) =>{
    try{
        const deleted = await Post.findByIdAndDelete(req.params.id);

        if(!deleted) return res.status(404).json({
            message: "Post not found"
        });

        res.status(200).json({
            message: "Post deleted", deleted
        });
    } catch(error){
        res.status(500).json({
            message: "Internal server error", error
        });
    }
}

export {
    createPost,
    getPost,
    updatePost,
    deletePost
}