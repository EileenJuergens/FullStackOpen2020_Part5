import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailsAreShown, setDetailsAreShown] = useState(false);

  const toggleView = () => {
    setDetailsAreShown(!detailsAreShown)
  }

  return (
    <div className='single-blog'>
      <p><b>{blog.title}</b> {blog.author} <button
        onClick={toggleView}>{detailsAreShown ? 'hide' : 'view'}</button></p>
      {detailsAreShown && (
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>like</button></p>
          <p>{blog.user.name}</p>
        </>
      )}
    </div>
  )
}


export default Blog
