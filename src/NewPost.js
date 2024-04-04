import React from 'react'

const NewPost = ({handlechange , postTitle , setPostTitle , postBody , setPostBody}) => {
 
  return (
    <main>
      <form action="" onSubmit={handlechange}>
            <label htmlFor=""><h3>post</h3></label>
            <input
             id='postTitle'
             type="text"
             required
             placeholder='Title'
             value={postTitle}
             onChange={(e)=>setPostTitle(e.target.value)}
              />

            <label htmlFor=""><h3>Post Body</h3></label>
<br />
              <textarea 
              name="postBody" 
              id="postBody" 
              cols="30"
               rows="10"
               value={postBody}
               onChange={(e)=>setPostBody(e.target.value)}
               />
               <br />
               <button type='submit'>Submit</button>
      </form>
  

    </main>
  )
}

export default NewPost