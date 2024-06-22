const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor  = require('../utils/middleware').userExtractor;

blogsRouter.get('/', async (request, response) => {
     const blogs = await Blog
       .find({})
       .populate('user', {username: 1, name: 1})
     response.json(blogs)
})
   
blogsRouter.post('/', userExtractor, async (request, response) => {
     console.log(request.body)
     const { title, url, likes, author } = request.body;

     if (!request.user) {
       return response.status(401).json({ error: 'token missing or invalid' });
     }
     const user = request.user;
   
     const blog = new Blog({
       title,
       author,
       url,
       likes,
       user: user.id,
     });
   
     if (!(blog.title || blog.author || blog.url)) {
       return response
         .status(400)
         .json({ error: 'title, author or url are required' })
         .end();
     }
     if (!blog.likes) {
       blog.likes = 0;
     }
     // await blog.populate('user', 'username name id');
     const savedBlog = await blog.save();
     user.blogs = user.blogs.concat(savedBlog.id);
     await user.save();
     response.status(201).json(savedBlog);
})

blogsRouter.get('/:id', async (request, response) => {
     const blog = await Blog.findById(request.params.id)
     if(blog){
          response.json(blog)
     }else{
          response.status(404).end()
     }
})

blogsRouter.delete('/:id', async (request, response, next) => {
     // const decodedToken = jwt.verify(request.token, process.env.SECRET)
     const userToCompare = await User.findById(request.user.id)
     const blogToDelete = await Blog.findById(request.params.id)
     // console.log("userToCompare: ", userToCompare._id.toString())
     // console.log("blogToDelete: ", blogToDelete.user._id.toString())
     if(userToCompare._id.toString() === blogToDelete.user._id.toString()){
          try{
               await Blog.findByIdAndDelete(request.params.id)
               response.status(204).end()
          }catch(exception){
               next(exception)
          }
     }else{
          return response.status(401).json({ error: 'unauthorized' })
     }
})

blogsRouter.put('/:id', async (request, response) => {
     const body = request.body
     const blog = {
          title: body.title,
          author: body.author,
          url: body.url,
          likes: body.likes
     }
     const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
     response.json(updatedBlog)
})

module.exports = blogsRouter