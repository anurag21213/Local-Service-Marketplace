import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <header className=' max-w-5xl mx-auto p-3 my-5 bg-black text-white rounded-3xl'>
        <nav className='flex items-center justify-evenly'>
            <h1 className='text-3xl font-bold'>UNICO</h1>

            <ul className='hidden md:flex items-center justify-evenly gap-10 font-normal text-xl text-slate-100'>
            <Link to='/' ><li className='cursor-pointer active:bg-white active:text-black p-2 rounded-2xl'>Home</li></Link>
                <li className='cursor-pointer active:bg-white active:text-black p-2 rounded-2xl'>About Us</li>
                <Link to='/services' ><li className='cursor-pointer active:bg-white active:text-black p-2 rounded-2xl'>Services</li></Link>
                <li className='cursor-pointer active:bg-white active:text-black p-2 rounded-2xl'>Our Work</li>
                <li className='cursor-pointer active:bg-white active:text-black p-2 rounded-2xl'>Contact Us</li>
            </ul>
        </nav>
    
    </header>
  )
}

export default Navbar
