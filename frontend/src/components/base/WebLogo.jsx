import Logo from "../../assets/linxedu/linxedu.png";
import React from "react";

const WebLogo = () => {
    return(
        <div className='content-center'>
            <img src={Logo} loading='lazy' alt='' className='inline sm:w-[130px] w-[100px]'/>
        </div>
    )
}
export default WebLogo