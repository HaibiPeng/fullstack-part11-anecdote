/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const Blog = ({ blog, user, addLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div id='blog' style={blogStyle}>
      <div style={hideWhenVisible} className='titleandauthor'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='titleandauthor'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        likes <span className='likes'>{blog.likes}</span>
        <button id='addlikes' onClick={() => addLikes(blog.id)}>like</button>
        <p>
          {blog.user.username === undefined ? user : blog.user.username}
        </p>
        <button onClick={() => deleteBlog(blog.id)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
