import { useEffect, useState } from 'react';
import Nav from './Nav';
import Logo from './logo';


function Layout({children}) {
    const [showNav, setShowNav] = useState(false);
    document.title = "Welcome";
    const[userInfo, setUserInfo] = useState({});

    useEffect(()=>{
        const user = localStorage.getItem("user");
        fetch("https://gadgetmart.runasp.net/api/gadgetmart/home/" + user, {
            method: "GET",
            credentials: "include"
        }).then(response => response.json()).then(data => {
            setUserInfo(data.userInfo)
            console.log("user info: ", data.userInfo)
        }).catch(error => {
            console.log("Error home page: ", error)
        }) 
    },[])
    return (
        <div className='bgGray min-h-screen '>
            <div className='block md:hidden flex items-center p-4 '>
                <button onClick={()=> setShowNav(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                </button>
                <div className='flex grow justify-center mr-6'>
                    <Logo />

                </div>
            </div>

            <section className='page'>
          
            {
                userInfo ?
                <div className='flex'>
                    <Nav show={showNav} />
                     <div className=' flex-grow bgGray p-4'>{children}</div>
                        
                </div> :
                <div className='warning'>
                    <div>Access Denied!!!</div>
                </div>
            }
            
        </section>

        </div>
    )
}

export default Layout;