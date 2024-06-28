import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggalable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState()
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [])

  const messageHandler = (message, type) => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage()
    }, 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      messageHandler('Wrong username or password!', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      messageHandler(
        `a new blog "${newBlog.title}" is added by ${newBlog.author}.`,
        'success'
      )
    } catch (exception) {
      messageHandler('Creating blog failed!', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    messageHandler('Successfully logout!!', 'success')
    setUser(null)
  }

  const likeBlog = async (id) => {
    // event.preventDefault()
    const blog = blogs.find((b) => b.id === id)
    // console.log('blog: ', blog)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    // console.log('changedBlog: ', changedBlog)
    await blogService.update(id, changedBlog)
    setBlogs(blogs.map((b) => (b.id === id ? changedBlog : b)))
    messageHandler(
      `You liked "${changedBlog.title}" by ${changedBlog.author}.`,
      'success'
    )
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (window.confirm(`Do you want to delete ${blog.title}`)) {
      try {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter((b) => b.id !== id))
        messageHandler('Delete success', 'success')
      } catch {
        messageHandler('Deleting blog failed!', 'error')
      }
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          onHandleLogin={handleLogin}
        />
      ) : (
        <div>
          <p>
            {user.name} logged-in!
            <button onClick={handleLogout} type="submit">
              Logout
            </button>
          </p>
          <Togglable
            buttonLabel="Create New Blog"
            buttonStatus="cancel"
            ref={blogFormRef}
          >
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .map((blog) => (
              <div key={blog.id}>
                <Blog blog={blog} />
                <Togglable buttonLabel="view" buttonStatus="hide">
                  <div>
                    <p>URL: {blog.url}</p>
                    <p>
                      Likes: {blog.likes}{' '}
                      <button onClick={() => likeBlog(blog.id)}>like</button>
                    </p>
                    <p>Author: {blog.author} </p>
                    <button onClick={() => deleteBlog(blog.id)}>remove</button>
                  </div>
                </Togglable>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default App
