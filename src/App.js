import Nav from "./Nav";
import Header from "./Header";
import Home from "./Home";
import NewPost from "./NewPost";
import About from "./About";
import Missing from "./Missing";
import Footer from './Footer';
import PostPage from "./PostPage";
import { Route, Routes} from "react-router-dom";
import EditePost from "./EditePost";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import{format} from 'date-fns'
import api from '../src/API/posts'
import useWindosSize from "../src/hooks/useWindosSize";
import useAxiosFetch from "../src/hooks/useAxiosFetch";




function App() {
     
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


setPosts(allPost);
setPostTitle('');
setPostBody('')
navgeter('/')
}
catch(err){
 

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
 

}

}

//api create




const { data , FetchError , loding} = useAxiosFetch("http://localhost:3500/posts")
useEffect( ()=>{
  setPosts(data)
},[data])





//api edite put method
const [postEditeTitle,setPostEditeTitle]=useState('')
const [postEditeBody,setPostEditeBody]=useState('')

const editepostfun = async (id)=>{

const datetime = format (new Date( ),'MMMM dd,yyyy pp');
const updatepost = {id ,title:postEditeTitle, datetime, body:postEditeBody};
try{
const responce=await api.put(`/posts/${id}`,updatepost)


setPosts(posts.map(post => post.id===id ? {...responce.data} : post )); 
setPostEditeTitle('')
setPostEditeBody('')
navgeter('/')
}
catch(err){
  
}
}
//mobile size changing

const {width} = useWindosSize() 


  return (
    <div className="App">
      <Header width={width}/>
      <Nav  search={search} setSearch={setSearch}/>
      <Routes>
   
    <Route path="/" element={<Home searchResult={searchResult}  FetchError={FetchError}  loding={loding} />}/>
      
      <Route path="/post" >

      <Route index  element={<NewPost  handlechange={handlechange}  postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody}  setPostBody={setPostBody}/>}/>

      <Route path=":id" element={<PostPage  posts={posts}  handleDelete={handleDelete}/>}/>

      </Route>
      <Route path="/editepost/:id" element={<EditePost posts={posts} postEditeTitle={postEditeTitle} postEditeBody={postEditeBody} setPostEditeTitle={setPostEditeTitle} setPostEditeBody={setPostEditeBody} editepostfun={editepostfun} />}/> 
      <Route path="/about" element={<About/>}/>  
      <Route path="/*" element={<Missing />} />
    </Routes>
   
    <Footer/>
    </div>
  );
}

export default App;
