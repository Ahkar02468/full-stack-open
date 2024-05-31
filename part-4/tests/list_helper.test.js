const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

     test('when list has many blogs, equals the likes of that', () => {
          const result = listHelper.totalLikes(listHelper.initialBlogs)
          assert.strictEqual(result, 36)
     })
})


describe('most likes blog', () => {

     test('when list has many blogs, the most favorite blog is this', () => {
          const result = listHelper.favoriteBlog(listHelper.initialBlogs)
          assert.deepStrictEqual(result, {
               _id: "5a422b3a1b54a676234d17f9",
               title: "Canonical string reduction",
               author: "Edsger W. Dijkstra",
               url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
               likes: 12,
               __v: 0
          })
     })
})