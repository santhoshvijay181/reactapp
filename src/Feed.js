import React from 'react'
import Post from './Post'

const Feed = ({searchResult}) => {
  return (
    <>
{
    searchResult.map((post)=><Post key ={post.id} post ={post}/>)
}
    </>
  )
}

export default Feed