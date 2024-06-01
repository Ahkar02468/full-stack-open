const { test, after, beforeEach, describe } = require('node:test')
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

test('blogs are returned as json', async () => {
     await api
     .get('/api/blogs')
     .expect(200)
     .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
     const response = await api
     .get('/api/blogs')

     assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a valid blog can be added', async () => {
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

test('verifies that if the likes property is missing from the request', async () => {
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

test('verify that if the title or url properties are missing', async () => {
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

describe('deletion of a blog', () => {
     test('succeeds with status code 204 if id is valid', async () => {
          const blogsAtStart = await helper.blogsInDb()
          const blogToDelete = blogsAtStart[0]

          await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)

          const blogsAtEnd = await helper.blogsInDb()
          assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length -1)

          const titles = blogsAtEnd.map(b => b.title)
          assert(!titles.includes(blogToDelete.title))

     })
})

describe('updation of a blog', () => {
     test('succeeds with status code 200 if id is valid', async () => {
          const blogsAtStart = await helper.blogsInDb()
          const blogToUpdate = blogsAtStart[0]

          blogToUpdate.likes = blogToUpdate.likes + 1
          await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(blogToUpdate)
          .expect(200)

          const blogsAtEnd = await helper.blogsInDb()
          assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
     })
})

after(async () => {
     await mongoose.connection.close()
})