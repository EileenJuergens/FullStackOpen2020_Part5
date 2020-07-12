import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [infoMessage, setInfoMessage] = useState(null);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [addFormIsShown, setAddFormIsShown] = useState(false);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setError(false)
        setInfoMessage(`The new blog "${newTitle}" by ${newAuthor} was added`)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
        setAddFormIsShown(false)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setError(true)
      setInfoMessage('❗️ Wrong credentials ❗️');
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null)
  }

  const loginForm = () => (
    <div className='login-box'>
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin}>
        <div className='login-input'>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Username'
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
          <label for='username'>Username</label>
        </div>
        <div className='login-input'>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
          <label for='password'>Password</label>
        </div>
        <button type='submit' className='login-button'>LOGIN</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div className='login-box'>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog} >
        <div className='login-input'>
          <input
            type='text'
            value={newTitle}
            name='title'
            id='title'
            placeholder='Title'
            onChange={handleTitleChange}
          />
          <label for='title'>Title</label>
        </div>
        <div className='login-input'>
          <input
            type='text'
            value={newAuthor}
            name='author'
            id='author'
            placeholder='Author'

            onChange={handleAuthorChange}
          />
          <label for='author'>Author</label>
        </div>
        <div className='login-input'>
          <input
            type='text'
            value={newUrl}
            name='url'
            id='url'
            placeholder='Url'
            onChange={handleUrlChange}
          />
          <label for='url'>Url</label>
        </div>
        <div className='login-button-container'>
          <button
            type='submit'
            className='login-button'
            >CREATE</button>
          <button
            type='button'
            className='login-button'
            onClick={() => setAddFormIsShown(false)}
            >CANCEL</button>
        </div>
      </form>
    </div>
  )

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  return (
    <div>
      <Notification message={infoMessage} error={error} />

      {user === null
        ? loginForm()
        : (
          <div>
            <h2>Blogs</h2>
            <p>{user.name} is logged in
              <button onClick={handleLogout}>logout</button>
            </p>
            {addFormIsShown === true
              ? blogForm()
              : (
                <div>
                <button
                  className='create-toggle-button'
                  onClick={() => setAddFormIsShown(true)}>Create a new blog</button>
                  {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                  )}
                </div>)
            }
          </div>
        )}
    </div>
  )
}

export default App
