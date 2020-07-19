import React, { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
  const [detailsAreShown, setDetailsAreShown] = useState(false);

  const toggleView = () => {
    setDetailsAreShown(!detailsAreShown)
  }

  const increaseLikes = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 })
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
        </>
      )}
    </div>
  )
}


export default Blog
