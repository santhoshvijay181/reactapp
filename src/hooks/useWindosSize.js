import  { useEffect, useState } from 'react'

const useWindosSize = () => {
    const [windowsSize,setWindowsSize]=useState({

        width:undefined,
        height:undefined

    })
    useEffect(()=>{
const hendleResize =()=>{

    setWindowsSize({
        width : window.innerWidth,
        height:window.innerHeight
    })
}

hendleResize()
window.addEventListener("resize",hendleResize)

return ()=>window.removeEventListener("resize",hendleResize)
    },[ ])

  return windowsSize;
}

export default useWindosSize