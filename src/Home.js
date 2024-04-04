import React from 'react'
import Feed from './Feed'


const Home = ({searchResult , FetchError , loding}) => {
 
  return (
    <main> 
     {loding && <p>data Loding</p>}
      {!loding && FetchError && <p>{FetchError}</p>}
      {!loding && !FetchError && (searchResult.length ? <Feed searchResult={searchResult} /> : (<h1>No Post Emtey</h1>)) } 
    
     {/* {posts.length ? <Feed posts={posts} /> : (<h1>No Post Emtey</h1>)}  */}
    </main>
  )
}

export default Home