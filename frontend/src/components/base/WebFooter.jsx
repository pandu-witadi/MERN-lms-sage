import LinxBrainCom from "../../assets/linxedu/linxbrain-com.png";
import React from "react";
import {accountFacebook, accountTwitter, accountYoutube, webDomain, accountInstagram} from "../../constant/constant.js";
import { FaYoutube, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const WebFooter = () => {
  const fontSize = 25;
  return (
    <footer className="footer text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <a href={webDomain} target={"_blank"}><img src={LinxBrainCom} width={150} loading='lazy' alt=''/></a>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        {/*{accountFacebook && <a href={accountFacebook} target={"_blank"} style={{color: 'inherit'}}><FaFacebook fontSize={fontSize} className="text-app_primary"/></a>}*/}
        {/*{accountYoutube && <a href={accountYoutube} target={"_blank"}><FaYoutube fontSize={fontSize}/></a>}*/}
        {/*{accountTwitter && <a href={accountTwitter} target={"_blank"}><FaTwitter fontSize={fontSize}/></a>}*/}
        {/*{accountInstagram && <a href={accountInstagram} target={"_blank"}><FaInstagram fontSize={fontSize}/></a>}*/}
      </nav>
    </footer>
  )
}
export default WebFooter