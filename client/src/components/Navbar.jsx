import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { faBars, faClose, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { toast } from 'react-toastify'

const Navbar = () => {

  const [open, setOpen] = useState(false)
  const path = useLocation().pathname
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const pathroute = path.split('/')?.[1]

  function applyActive(currpath) {
    let classes = "cursor-pointer p-2 rounded-2xl "

    if (currpath == pathroute) {
      classes += "bg-white text-black"
    }
    // console.log(classes);

    return classes

  }

  const handleOpen = () => {
    setOpen((prev) => !prev)
  }
  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <div>
      <header className=' max-w-7xl mx-auto p-2 my-5 bg-black text-white rounded-3xl'>
        <nav className='flex items-center justify-between p-2'>
          <NavLink to='/home' ><h1 className='text-3xl font-bold'>Local Service Marketplace</h1></NavLink>

          <ul className='hidden lg:flex items-center justify-evenly gap-10 font-normal text-xl text-slate-100'>
            <NavLink to='/home' ><li className={applyActive('home')}>Home</li></NavLink>
            <NavLink to='/about' ><li className={applyActive('about')}>About Us</li></NavLink>
            <NavLink to='/services' ><li className={applyActive('services')}>Services</li></NavLink>
            <NavLink to='/contact' ><li className={applyActive('contact')}>Contact Us</li></NavLink>
            <NavLink to='/profile' >
              <li className={`${applyActive('profile')} flex items-center gap-2`}>
                <FontAwesomeIcon icon={faUser} />

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
            <NavLink to='/home' ><li className={applyActive('home')}>Home</li></NavLink>
            <li className={applyActive('about')}>About Us</li>
            <NavLink to='/services' ><li className={applyActive('services')}>Services</li></NavLink>
            <NavLink to='/profile' >
              <li className={`${applyActive('profile')} flex items-center gap-2`}>
                <FontAwesomeIcon icon={faUser} />
                <span>Profile</span>
              </li>
            </NavLink>
            <li className={applyActive('work')}>Our Work</li>
            <li className={applyActive('contact')}>Contact Us</li>
          </ul>
        </div>
      }


    </div>

  )
}

export default Navbar
