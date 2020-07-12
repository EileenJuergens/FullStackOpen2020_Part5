import React from 'react'

const Blog = ({ blog }) => (
  <div className='single-blog'>
    <p>{blog.title}</p>
    <p>{blog.author}</p>
    <p>{blog.url}</p>
  </div>
)

export default Blog
