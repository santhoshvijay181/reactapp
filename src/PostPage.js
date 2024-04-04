import React from 'react'
import { Link , useParams } from 'react-router-dom'


const PostPage = ({posts , handleDelete}) => {
    const {id}=useParams()
    const post=posts.find((post) => (post.id).toString() === id )
  return (
    <main>
        { post &&
          
        <>    
         <h1>{post.title}</h1>
         <p>{post.datetime}</p>
         <p>{post.body}</p>
         <button onClick={()=>handleDelete(post.id)}>Deletepost</button>
         <Link to ={`/editepost/${post.id}`}>
         <button>EditPost</button>
          </Link>

         </>
         
        }
        {!post && 
        <>
        <h1>Post Not Found</h1>
        <p>well that is disappaniting</p>
        </>}
        <Link to='/' className='Link'>Visit Our Home </Link>
    </main>
  )
}

export default PostPage