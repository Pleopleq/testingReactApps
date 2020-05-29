import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5

}

const BlogMoreInfo = ({ url, likes, username, visible, handleLikeButton, handleDeleteButton}) => {
  return (
  <div style={visible}>
    <p>{url}</p>
    <p>{likes}<button onClick={handleLikeButton}>like</button></p>
    <p>{username}</p>
    <button onClick={handleDeleteButton}>Delete</button>
  </div>
  )
}

const Blog = ({ blog }) => { 
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    setLikes(blog.likes) 
  }, [])
  
  let viewButton = 'view';
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none'}

  if(blogInfoVisible){
    viewButton = 'hide'
  }

  const handleLikeButton = async () => {
    let editedBlog = {...blog}
    delete editedBlog.user
    await blogService.update(blog.id, editedBlog)
    setLikes(++blog.likes)
  }

  const handleInfoState = (event) => {
    setBlogInfoVisible(true)
    if(event.target && blogInfoVisible === true){
      setBlogInfoVisible(false)
    }
  }

  const handleDeleteButton = async (event) => {
    if(event){
      const confirm = window.confirm(`remove ${blog.title}?`)
      if(confirm){
        await blogService.deleteBlog(blog.id)
        window.location.reload()
      }
    }
  }

  //The view button needs to toggle the likes, url and username of that blog when is clicked,
  //just like the new blog form does.
  //To hide the info you need to click the "view" button.
  //the view button text change when its clicked to "hide"
  //add a button next to the "likes"
    return (
      <div style={blogStyle}> 
      {blog.title} - {blog.author}. 
      <button onClick={handleInfoState}>{viewButton}</button>  
      <BlogMoreInfo
      url={blog.url}
      likes={likes}
      username={blog.user.name}
      handleLikeButton={handleLikeButton}
      handleDeleteButton={handleDeleteButton}
      visible={showWhenVisible}
      />
    </div>
    )
  }

export default Blog
