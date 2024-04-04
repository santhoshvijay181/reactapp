import React, {  useEffect } from 'react'
import { useParams ,Link} from 'react-router-dom'

const EditePost = ( {posts,postEditeTitle,postEditeBody,setPostEditeTitle,setPostEditeBody,editepostfun  }) => {
  const {id}=useParams()
    const post= posts.find(post => (post.id).toString()===id)
    
    useEffect(()=>{
          if(post){
            setPostEditeTitle(post.title)
            setPostEditeBody(post.body)
          } 
        },[post,setPostEditeBody,setPostEditeTitle]
      )
  return (
   <main>

      {
        postEditeTitle && 
        <>
        <h1>EditPostfuck</h1>
        <form  onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor="">Title</label>
          <br />
          <input 
          type="text" 
          id='postTitle'
          required
          placeholder='Title'
          value={postEditeTitle}
          onChange={(e)=>setPostEditeTitle(e.target.value)}    
          />
<br />
          <label htmlFor="">body</label>
      <br />
          <textarea 
           name="postBody" 
              id="postBody" 
              cols="30"
               rows="10"
              value={postEditeBody}
              onChange={(e)=>setPostEditeBody(e.target.value)}
          />
          <br />

          <button type='submit'onClick={()=>editepostfun(post.id)} >submit</button>
          

        </form>
        
        </>
      }
    {
      !postEditeTitle &&
      <>
      <h1>Post Not Found</h1>
      <p>well that is disappaniting</p>
      </>}
      <br />
      <Link to='/' className='Link'>Visit Our Home </Link>
    
   </main>
    
  )
}

export default EditePost