
import { CiMobile3 } from "react-icons/ci";
import { IoMdTabletLandscape } from "react-icons/io";
import { RiComputerLine } from "react-icons/ri";


const Header = ({width}) => {
  
  return (
    
    <header><h1>SANTHOSH POST APP</h1>
    {
      width < 768 ?   <CiMobile3 className='headericons'/>
      : width < 992 ? <IoMdTabletLandscape className='headericons'/>
      : <RiComputerLine className='headericons' />

    }
    
    </header>
  )
}

export default Header