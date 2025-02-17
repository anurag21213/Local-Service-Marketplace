import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'

const Navbar = () => {
  const path=useLocation().pathname

  const pathroute=path.split('/')?.[1]

  function applyActive(currpath){
    let classes="cursor-pointer p-2 rounded-2xl "

    if(currpath==pathroute){
      classes+="bg-white text-black"
    }
    // console.log(classes);
    
    return classes
    
  }
  console.log(pathroute);
  
  return (
    <header className=' max-w-7xl mx-auto p-2 my-5 bg-black text-white rounded-3xl'>
        <nav className='flex items-center justify-between p-2'>
            <h1 className='text-3xl font-bold'>Local Service Marketplace</h1>

            <ul className='hidden md:flex items-center justify-evenly gap-10 font-normal text-xl text-slate-100'>
            <NavLink to='/home' ><li className={applyActive('home')}>Home</li></NavLink>
                <li className={applyActive('about')}>About Us</li>
                <NavLink  to='/services' ><li className={applyActive('services')}>Services</li></NavLink>
                <li className={applyActive('work')}>Our Work</li>
                <li className={applyActive('contact')}>Contact Us</li>
            </ul>
        </nav>
    
    </header>
  )
}

export default Navbar
