import React from 'react'
import { useState,useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import{format} from 'date-fns'
import api from '../API/posts'
import useWindosSize from "../hooks/useWindosSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({})

export const Datacontext = ({Children} ) => {
     
  const [posts,setPosts]=useState([])

  const [search,setSearch]=useState('');
  const [searchResult,setSearchResult]=useState([]);
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const navgeter=useNavigate()

  const handlechange = async (e) =>{
e.preventDefault()
const id = posts.length ? posts[posts.length-1 ].id+1 : 1  ;
const datetime = format (new Date( ),'MMMM dd,yyyy pp');
const newpost = {id ,title:postTitle, datetime, body:postBody};

//post axios method
try{

const responce= await api.post('/posts',newpost)
const allPost=[...posts,responce.data]
console.log(allPost,"ena da error vathuducha ?") 

setPosts(allPost);
setPostTitle('');
setPostBody('')
navgeter('/')
}
catch(err){
  if (err.responce){
    console.log(err.responce.data);
    console.log(err.responce.status);
    console.log(err.responce.headers);
  }
  else{
    console.log(`Error:${err.message}`)
  }

}
} 
  

useEffect(()=>{
const filterResults=posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase) || ((post.title).toLowerCase()).includes(search.toLowerCase()))
setSearchResult(filterResults.reverse())
},[posts,search])

const handleDelete = async (id) => {
try{
  await api.delete(`/posts/${id}`)
  const deletepost  = posts.filter( post=> post.id !== id )
setPosts(deletepost)
navgeter('/')
}
catch(err){
  console.log(`Error:${err.message}`)

}

}

//api create




const { data , FetchError , loding} = useAxiosFetch("http://localhost:3500/posts")
useEffect( ()=>{
  setPosts(data)
},[data])




/*useEffect(()=>{
  const fetchdata = async () =>{
    try{
      const responce= await api.get("/posts");
      setPosts(responce.data);

    }
    catch(err){
     
     
        console.log(`Error:${err.message}`)
      

    }
  
  }
(async()=> await fetchdata())()
},[posts]

)*/

//api edite put method
const [postEditeTitle,setPostEditeTitle]=useState('')
const [postEditeBody,setPostEditeBody]=useState('')

const editepostfun = async (id)=>{

const datetime = format (new Date( ),'MMMM dd,yyyy pp');
const updatepost = {id ,title:postEditeTitle, datetime, body:postEditeBody};
try{
const responce=await api.put(`/posts/${id}`,updatepost)
console.log(updatepost.data) 

setPosts(posts.map(post => post.id===id ? {...responce.data} : post )); 
setPostEditeTitle('')
setPostEditeBody('')
navgeter('/')
}
catch(err){
  console.log(`Error  ${err.message}` )
}
}
//mobile size changing

const {width} = useWindosSize() 

  return (
    <DataContext.Provider value={{
      width ,search , setSearch ,searchResult , FetchError , loding ,
      handlechange , postTitle , setPostTitle , postBody , setPostBody ,
      posts,postEditeTitle,postEditeBody,setPostEditeTitle,setPostEditeBody,editepostfun,
      handleDelete,
     }}>
         {Children}
     </DataContext.Provider>
  )
}

export default Datacontext
