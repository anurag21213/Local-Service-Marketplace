import React from 'react'
import {faInstagram,faLinkedin,faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <footer className='w-full flex items-center justify-center p-5 my-5 gap-10 flex-col md:flex-row'>
        <div className='md:w-[30%] flex items-center justify-center'>
            <h1 className='text-6xl font-semibold'>UNICO</h1>
        </div>
        <div className='flex items-center justify-evenly gap-5 md:w-[70%] flex-col md:flex-row'>
            <div>
                <h1 className='text-3xl my-3 font-semibold'>Content</h1>
                <p className='text-lg'>Home</p>
                <p className='text-lg'>About</p>
                <p className='text-lg'>Our Work</p>
                <p className='text-lg'>Services</p>
            </div>
            <div>
                <h1 className='text-3xl my-3 font-semibold'>Follow Us</h1>
                <p className='text-lg'><FontAwesomeIcon icon={faInstagram} className='mx-2' />Instagram</p>
                <p className='text-lg'><FontAwesomeIcon icon={faLinkedin} className='mx-2'/>LinkedIn</p>
                <p className='text-lg'><FontAwesomeIcon icon={faFacebook} className='mx-2'/>Facebook</p>
               
            </div>
            <div>
                <h1 className='text-3xl my-3 font-semibold'>Contact</h1>
                <p className='text-lg'>+91 4356894356</p>
                <p className='text-lg'>unico@gmail.com</p>
                
            </div>
            
        </div>
    </footer>
  )
}

export default Footer
