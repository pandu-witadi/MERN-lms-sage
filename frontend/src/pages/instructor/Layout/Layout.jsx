import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Outlet} from "react-router-dom"
import {WebLoading} from "../../../components/base/index.jsx";

const Layout = () => {

    const {loading: authLoading} = useSelector((state) => state.auth);

    if (authLoading) {
        return (<WebLoading/>)
    }

    // Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
      <div className={"h-screen"}>
          <Outlet/>
      </div>
    )
}

export default Layout
