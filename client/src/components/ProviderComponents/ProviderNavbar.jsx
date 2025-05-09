import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { faBars, faClose, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { toast } from 'react-toastify'

const Navbar = () => {
    const path = useLocation().pathname
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    

    const pathroute = path.split('/')?.[1]

    function applyActive(currpath) {
        let classes = "cursor-pointer p-2"

        if (currpath == pathroute) {
            if (currpath == 'providerprofile') {
                classes += " bg-white text-black rounded-full"
            }
            else {
                classes += " bg-white text-black rounded-2xl"
            }
        }

        return classes
    }

    const handleOpen = () => {
        setOpen((prev) => !prev)
    }

    const handleProfileClick = () => {
        navigate('/providerprofile')
    }

    const handleLogout = () => {
        dispatch(logout())
        toast.success('Logged out successfully')
        navigate('/')
    }

    return (
        <div>
            <header className='max-w-7xl mx-auto p-2 my-5 bg-black text-white rounded-3xl'>
                <nav className='flex items-center justify-between p-2'>
                    <h1 className='text-3xl font-bold md:block hidden'>Local Service Marketplace</h1>
                    <h1 className='text-3xl font-bold md:hidden '>LSP</h1>

                    <ul className='hidden lg:flex items-center justify-evenly gap-10 font-normal text-xl text-slate-100'>
                        <NavLink to='/providerdashboard'>
                            <li className={applyActive('providerdashboard')}>Dashboard</li>
                        </NavLink>
                        <NavLink to='/pricing'>
                            <li className={applyActive('pricing')}>Pricing</li>
                        </NavLink>

                        <div className="relative">
                            <button
                                onClick={handleProfileClick}
                                className="p-2 hover:bg-white hover:text-black rounded-full transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
                            </button>

                    
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 p-2 hover:bg-white hover:text-black rounded-2xl transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span>Logout</span>
                        </button>
                    </ul>

                    {
                        open ?
                            <FontAwesomeIcon icon={faClose} className='text-[35px] lg:hidden cursor-pointer' onClick={handleOpen} /> :
                            <FontAwesomeIcon icon={faBars} className='text-[35px] lg:hidden cursor-pointer' onClick={handleOpen} />
                    }
                </nav>
            </header>

            {open && (
                <div className='w-[80%] md:w-[30%] h-screen bg-black text-white p-10 absolute z-10 lg:hidden'>
                    <ul className='flex flex-col items-center justify-evenly gap-10 font-normal text-xl text-slate-100'>
                        <NavLink to='/providerdashboard'>
                            <li className={applyActive('providerdashboard')}>Dashboard</li>
                        </NavLink>

                        <NavLink to='/providerprofile'>
                            <li className={applyActive('providerprofile')}>
                                <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
                            </li>
                        </NavLink>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 p-2 hover:bg-white hover:text-black rounded-2xl transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span>Logout</span>
                        </button>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Navbar
