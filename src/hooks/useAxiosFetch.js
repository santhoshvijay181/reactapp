import axios from 'axios'
import  { useEffect, useState } from 'react' 

const useAxiosFetch = (dataURL) => {
  const [data,setData]=useState([])
  const [FetchError,setFetchError]=useState(null)
  const [loding,setLoding ]=useState(false)

    useEffect(()=>{
        let isMounted = true
        const source = axios.CancelToken.source();
         const fetchData = async (url) =>{
          setLoding(true)
          try{
            const responce = await axios.get(url , {
              CancelToken:source.token
            });
            if(isMounted){
              setData(responce.data)
              setFetchError(null)
            }

          }
          catch(err){
            if(isMounted){
              setFetchError(err.message)
              setData([])
            }
            
         }
         finally{

          isMounted && setTimeout(()=>
          
          setLoding(false),2000)
         }
        }


        fetchData(dataURL) 

        const cleanUP = () =>{
          isMounted = false;
          source.cancel();
        }
        return cleanUP;
 

     },[dataURL])
    return {
      data , FetchError , loding
    }
}

export default useAxiosFetch
