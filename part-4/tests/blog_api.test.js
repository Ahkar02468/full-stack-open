const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
     await Blog.deleteMany({})
   
     await Blog.insertMany(helper.initialBlogs)
})

test.only('blogs are returned as json', async () => {
     await api
     .get('/api/blogs')
     .expect(200)
     .expect('Content-Type', /application\/json/)
})

test.only('all blogs are returned', async () => {
     const response = await api
     .get('/api/blogs')

     assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test.only('a valid blog can be added', async () => {
     const newBlog = {
          title: 'async/await simplifies making async calls',
          author: 'Tim',
          url: 'https://www.google.com',
          likes: 1
     }

     await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(201)
     .expect('Content-Type', /application\/json/)

     const blogsAtEnd = await helper.blogsInDb()
     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

     const contents = blogsAtEnd.map(b => b.title)
     assert(contents.includes('async/await simplifies making async calls'))
})

// Mock the function that creates the blog object (optional)

test.only('verifies that if the likes property is missing from the request', async () => {
     const newBlog = {
          title: 'check if the blog has no likes make it default 0',
          author: 'Tim Cock',
          url: 'https://www.x.com',
     }

     const createBlog = newBlog.likes ? newBlog : { ...newBlog, likes: 0 }

     await api
     .post('/api/blogs')
     .send(createBlog)
     .expect(201)
     .expect('Content-Type', /application\/json/)

     const blogsAtEnd = await helper.blogsInDb()
     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

     // const contents = blogsAtEnd.map(b => b.cont
     assert.strictEqual(createBlog.likes, 0);
})

test.only('verify that if the title or url properties are missing', async () => {
     const newBlog = {
          author: 'Tom Cruize'
        }

     await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(400)

     const blogsAtEnd = await helper.blogsInDb()
     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
     await mongoose.connection.close()
})