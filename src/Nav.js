import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({search ,setSearch}) => {

  return (
    <div className='navbar'>
      <div className='inputdiv'>
       <form onSubmit={((e) => e.preventDefault())} >
            {/* <label htmlFor=""> search</label> */}
            <input 
            type="text"
            required
            placeholder='search'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
        </form>
        </div>
 <div className='linkdiv'>
        <Link to = "/"  className='link' >Home</Link>
        <Link to = "/post"  className='link'>Post</Link>
        <Link to = "/about"  className='link'>About</Link>

        </div>   
        

 
    </div>
  )
}

export default Nav