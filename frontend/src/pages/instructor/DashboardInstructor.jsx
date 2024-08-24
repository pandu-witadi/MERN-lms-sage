import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Outlet} from "react-router-dom"
import Navbar from "./component/Navbar.jsx";
import Sidebar from "./component/Sidebar.jsx";
import {WebLoading} from "../../components/base/index.jsx";

const DashboardInstructor = () => {

    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if (profileLoading || authLoading) {
        return (<WebLoading/>)
    }
    // Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className={""}>
            <Navbar/>
            <div className={`relative flex flex-row h-[calc(100vh-64px)]`}>
                <Sidebar/>
                <div className='flex flex-col overflow-auto w-full'>
                    <Outlet/>
                </div>
            </div>
            {/*<WebFooter/>*/}
        </div>
    )
}

export default DashboardInstructor
