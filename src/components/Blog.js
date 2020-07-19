import React, { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, loggedInUser }) => {
  const [detailsAreShown, setDetailsAreShown] = useState(false);

  const toggleView = () => {
    setDetailsAreShown(!detailsAreShown)
  }

  const increaseLikes = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 });
  }

  const removeBlog = () => {
    const result = window.confirm(`Remove blog "${blog.title}" by ${blog.author}`);
  
    if (result === true) {
      deleteBlog(blog.id);
    }
  }

  return (
    <div className='single-blog'>
      <p><b>{blog.title}</b> {blog.author} <button
        onClick={toggleView}>{detailsAreShown ? 'hide' : 'view'}</button></p>
      {detailsAreShown && (
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={increaseLikes}>like</button></p>
          <p>{blog.user.name}</p>
          {loggedInUser.name === blog.user.name && (
            <button onClick={removeBlog}>remove</button>
          )}
        </>
      )}
    </div>
  )
}


export default Blog
