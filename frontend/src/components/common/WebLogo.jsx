import Logo from "../../assets/Logo/app-logo.png";
import React from "react";

const WebLogo = () => {
    return(
        <div className='content-center'>
            <img src={Logo} width={32} loading='lazy' alt='' className='inline'/>
            <div className='inline ml-2 text-blue-50 font-bold text-2xl'>SAGE</div>
        </div>
    )
}
export default WebLogo