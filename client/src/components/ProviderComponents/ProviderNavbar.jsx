import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { faBars,faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
    const path = useLocation().pathname
    const [open, setOpen] = useState(false)

    const pathroute = path.split('/')?.[1]

    function applyActive(currpath) {
        let classes = "cursor-pointer p-2  "

        if (currpath == pathroute) {
            if (currpath == 'providerprofile') {
                classes += "bg-white text-black rounded-full"
            }
            else {
                classes += "bg-white text-black rounded-2xl"

            }
        }
        // console.log(classes);

        return classes

    }
    const handleOpen = () => {
        setOpen((prev) => !prev)
    }
    // console.log(pathroute);

    return (
        <div>
            <header className=' max-w-7xl mx-auto p-2 my-5 bg-black text-white rounded-3xl'>
                <nav className='flex items-center justify-between p-2'>
                    <h1 className='text-3xl font-bold'>Local Service Marketplace</h1>

                    <ul className='hidden lg:flex items-center justify-evenly gap-10 font-normal text-xl text-slate-100'>
                        <NavLink to='/providerdashboard' ><li className={applyActive('providerdashboard')}>Dashboard</li></NavLink>

                        <NavLink to='/providerprofile' ><li className={applyActive('providerprofile')}><span className=' '>P</span></li></NavLink>

                    </ul>
                    {
                        open ?
                            <FontAwesomeIcon icon={faClose} className='text-[35px] lg:hidden' onClick={handleOpen} /> :
                            <FontAwesomeIcon icon={faBars} className='text-[35px] lg:hidden' onClick={handleOpen} />
                    }
                </nav>

               


            </header>
            {
                open && <div className='w-[80%] md:w-[30%] h-screen bg-black text-white p-10 absolute z-10 lg:hidden'>
                <ul className='flex-col items-center justify-evenly gap-10 font-normal text-xl text-slate-100'>
                <NavLink to='/providerdashboard' ><li className={applyActive('providerdashboard')}>Dashboard</li></NavLink>

                <NavLink to='/providerprofile' ><li className={applyActive('providerprofile')}><span className=' '>P</span></li></NavLink>

            </ul>
                </div>
            }
        </div>

    )
}

export default Navbar
