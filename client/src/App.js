/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const ErrorNotification = ({ errormessage }) => {
  if (errormessage === null) {
    return null
  }

  return (
    <div className="error">
      {errormessage}
    </div>
  )
}

const SuccessNotification = ({ successmessage }) => {
  if (successmessage === null) {
    return null
  }

  return (
    <div className="success">
      {successmessage}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    )
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')

    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
    setSuccessMessage('logged out successfully')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        let Blogs = blogs.concat(returnedBlog)
        setBlogs(Blogs)
        console.log(returnedBlog)
        setSuccessMessage(`a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
          //window.location.reload()
        }, 5000)
      })
      .catch (error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const creatBlogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user.username}/>
    </Togglable>
  )

  const addLikes = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))
  }

  const deleteBlog = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      //console.log(blog.user)
      if (blog.user.username === user.username || blog.user.username === undefined) {
        blogService
          .deleteBlog(id)
          .then(setBlogs(blogs.filter(item => item.id !== id)),
            setSuccessMessage(`blog '${blog.title}' by ${blog.author} deleted`),
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000))
      } else {
        blogService
          .deleteBlog(id)
          .catch (error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
  }

  const blogList = () => {
    return (
      <div id='showblogs'>
        {blogs.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes)).map(blog =>
          <Blog key={blog.id} blog={blog} user={user.username}
            addLikes={() => addLikes(blog.id)} deleteBlog={() => deleteBlog(blog.id)}/>
        )}
      </div>
    )
  }

  return (
    <div>
      <SuccessNotification successmessage={successMessage}/>
      <ErrorNotification errormessage={errorMessage}/>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.username} logged in<button onClick={handleLogout}>logout</button></p>
          {creatBlogForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App