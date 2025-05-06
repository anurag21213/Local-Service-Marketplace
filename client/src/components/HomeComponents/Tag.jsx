import React from 'react'
import Button from '.././Button'
import { Link } from 'react-router-dom'

const Tag = () => {
  return (
    <div className='w-full  bg-gradient-to-t from-gray-100 to-gray-50 rounded-3xl  p-5 my-20'>
            <div className='flex items-center justify-between p-5 flex-col'>
                <h1 className='text-5xl font-semibold mt-3'>Local Experts. Trusted Services,</h1>
                <h1 className='text-5xl font-semibold my-5'>Just a Click Away.</h1>
                
                <Link to={'/services'}><Button content="Get Services" /></Link>
            </div>

            
        </div>
  )
}

export default Tag
