import React from 'react'

const NewBlogForm = ({
    handleSubmit,
    newTitle,
    newAuthor,
    newUrl,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange

}) =>{
return (  
<form onSubmit={handleSubmit}>
      <h2>Create new</h2>
        <div>
          title:
          <input
          type="text"
          value={newTitle}
          name="Title"
          onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
          type="text"
          value={newUrl}
          name="url"
          onChange={handleUrlChange}
          />
        </div>
    <button type="submit">Create</button>
</form>
    )
}

export default NewBlogForm
