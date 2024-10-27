import express from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/postController.js";
const router = express.Router();



// get all posts
router.get('/posts', getPosts);


// get single post

router.get('/posts/:id', getPost)
// create a new post
router.post('/posts', createPost)

// update a post
router.put('/posts/:id', updatePost)

// delete a post

router.delete('/posts/:id', deletePost)


export default router