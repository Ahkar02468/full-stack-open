const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
     const blogs = await Blog
       .find({})
       .populate('user', {username: 1, name: 1})
     response.json(blogs)
})
   
blogsRouter.post('/', async (request, response, next) => {
     const body = request.body

     // console.log("request.token: ", request.token)
     // const decodedToken = jwt.verify(request.token, process.env.SECRET)

     // if (!decodedToken.id) {
     //      return response.status(401).json({ error: 'token missing or invalid in blogs' })
     // }
     if (body.title === undefined || body.url === undefined) {
          return response.status(400).json({ error: 'title or url is missing' })
     }
     console.log("request.user.id: ", request.user.id)
     const user = await User.findById(request.user.id)
     const blog = new Blog({
          title: body.title,
          author: body.author,
          url: body.url,
          likes: body.likes,
          user: user._id
     })

     const savedBlog = await blog.save()
     user.blogs = user.blogs.concat(savedBlog._id)
     await user.save()

     response.status(201).json(savedBlog)
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