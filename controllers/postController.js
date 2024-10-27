

let posts = [
    {id:1, title: 'Post One'},
    {id:2, title: 'Post Two'},
    {id:3, title: 'Post Three'},
    {id:4, title: 'Post Four'},
    {id:5, title: 'Post Five'},
]

// @desc Get all posts
// @routes GET /api/posts

export const getPosts = (req, res, next) => {
    const limit = parseInt(req.params.limit);
    if(!isNaN(limit) && limit > 0){
       return res.status(200).json(posts.slice(0, limit));
    }
   
    res.status(200).json(posts);
};


// @desc    get single post
// @routes  GET /api/posts/:id
export const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if(!post){
        const error = new Error(`The post ${id} does not exist`);
        error.status = 404;
        return next(error);
    }
    res.status(200).json(post);
}

// @desc create a new post
//  @routes POST /api/posts

export const createPost = (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
    }
    if(!newPost.title){
        const error = new Error(`Please insert the title`);
        error.status = 400;
        return next(error);
    }
    posts.push(newPost);
    res.status(201).json(newPost);
}

// @desc update a post
// @routes PUT /api/

export const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if(!post){
        const error = new Error(`The post with id ${id} does not exist`);
        error.status = 404;
        return next(error);
    }
    post.tite = req.body.title || post.tite;
    res.status(200).json(post);
}

// @desc delete a post
// @routes DELETE /api/:id

export const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if(!post){
        const error = new Error(`The post with id ${id} does not exist`);
        error.status = 404;
        return next(error);
    }
    posts = posts.filter(post => post.id !== id);
    res.status(200).json(posts)
}