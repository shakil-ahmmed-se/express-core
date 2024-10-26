import express from "express";
const router = express.Router();


let posts = [
    {id:1, title: 'Post One'},
    {id:2, title: 'Post Two'},
    {id:3, title: 'Post Three'},
    {id:4, title: 'Post Four'},
    {id:5, title: 'Post Five'},
]

// get all posts
router.get('/posts', (req, res) => {
    const limit = parseInt(req.query.limit);
    console.log(limit)
    if(!isNaN(limit) && limit > 0){
        res.status(200).json(posts.slice(0, limit));
    }
    else{
        res.status(200).json(posts)
    }
});


// get single post

router.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if(!post){
        res.status(404).json({message: 'Post not found'});
    }else{
        res.status(200).json(post)
    }
})
// create a new post
router.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }
    if(!newPost.title){
        res.status(400).json({message: 'Invalid title'})
    }
    else{
        posts.push(newPost);
        res.status(201).json(newPost);
    }
})

// update a post
router.put('/posts/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if(!post){
        res.status(404).json({message: 'Post not found'})
    }
    else{
        post.title = req.body.title || post.title;
        res.status(200).json(post)
    }

})

// delete a post

router.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if(!post){
        res.status(404).json({message: 'Post not found'})
    }
    else{
        posts = posts.filter(post => post.id !== id);
        res.status(200).json(posts); // no content status code
    }
})


export default router