import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { faBars,faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {

  const [open, setOpen] = useState(false)
  const path = useLocation().pathname

  const pathroute = path.split('/')?.[1]

  function applyActive(currpath) {
    let classes = "cursor-pointer p-2 rounded-2xl "

    if (currpath == pathroute) {
      classes += "bg-white text-black"
    }
    // console.log(classes);

    return classes

  }
  
  const handleOpen=()=>{
    setOpen((prev)=>!prev)
  }

  return (
    <div>
      <header className=' max-w-7xl mx-auto p-2 my-5 bg-black text-white rounded-3xl'>
        <nav className='flex items-center justify-between p-2'>
          <NavLink to='/home' ><h1 className='text-3xl font-bold'>Local Service Marketplace</h1></NavLink>

          <ul className='hidden lg:flex items-center justify-evenly gap-10 font-normal text-xl text-slate-100'>
            <NavLink to='/home' ><li className={applyActive('home')}>Home</li></NavLink>
            <li className={applyActive('about')}>About Us</li>
            <NavLink to='/services' ><li className={applyActive('services')}>Services</li></NavLink>
            <li className={applyActive('work')}>Our Work</li>
            <li className={applyActive('contact')}>Contact Us</li>
          </ul>
          {
            open?
            <FontAwesomeIcon icon={faClose} className='text-[35px] lg:hidden' onClick={handleOpen} />:
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
            <li className={applyActive('work')}>Our Work</li>
            <li className={applyActive('contact')}>Contact Us</li>
          </ul>
        </div>
      }


    </div>

  )
}

export default Navbar
