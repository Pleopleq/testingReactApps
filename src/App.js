import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successNotification, setSuccessNotification] = useState(null)
  const [failNotification, setFailNotification] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
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
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ( event ) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {

      setFailNotification('Wrong user or password')
      setTimeout(() => {
        setFailNotification(null)
    }, 4000);
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const handleNewPost = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      ulr: newUrl
    }

    const addedBlog = await blogService.create(newBlog)
    setSuccessNotification('A new blog that you never gonna watch has been added!')
    setTimeout(() => {
      setSuccessNotification(null)
  }, 4000);
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setBlogs(blogs.concat(addedBlog))
  }

    
      if (user === null) { 
      return ( 
      <div> 
        <h2>log in to application</h2>
        <Notification message={failNotification} className={'fail-alert'}></Notification>
      <form onSubmit={handleLogin}>
        <div>
              username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              />
        </div>
        <div>
            password
              <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
      )
    }

    return (
      <div>
      <h2>blogs</h2>
      <Notification message={successNotification} className={'success-alert'}></Notification>
      <h3>{user.name} logged in <button onClick={handleLogOut}>Log Out</button></h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
      <form onSubmit={handleNewPost}>
      <h2>Create new</h2>
        <div>
          title:
          <input
          type="text"
          value={newTitle}
          name="Title"
          onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
          type="text"
          value={newUrl}
          name="url"
          onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default App