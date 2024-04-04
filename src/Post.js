import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  return (
    <main>
      <Link to={`/post/${post.id}`}>
         <h1>{post.title}</h1>
        <p>{post.datetime}</p>
        </Link> 
        <p>{(post.body).length <=24 ? post.body : `${(post.body).slice(1,24)}`}</p>
    </main>
  )
}

export default Post