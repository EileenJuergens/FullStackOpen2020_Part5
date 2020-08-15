/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, updateBlog, deleteBlog, loggedInUser }) => {
  const [detailsAreShown, setDetailsAreShown] = useState(false)

  const toggleView = () => {
    setDetailsAreShown(!detailsAreShown)
  }

  const increaseLikes = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const removeBlog = () => {
    const result = window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)

    if (result === true) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className='single-blog'>
      <div className='single-blog__short'>
        <p data-testid='title'>{blog.title}</p>
        <p data-testid='author'>{blog.author}</p>
        <button onClick={toggleView}>{detailsAreShown ? 'hide' : 'view'}</button>
      </div>
      {detailsAreShown && (
        <>
          <p data-testid='url'>{blog.url}</p>
          <p data-testid='likes'>likes {blog.likes} <button onClick={increaseLikes}>like</button></p>
          <p>{blog.user.name}</p>
          {loggedInUser.name === blog.user.name && (
            <button onClick={removeBlog}>remove</button>
          )}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  loggedInUser: PropTypes.object
}


export default Blog
