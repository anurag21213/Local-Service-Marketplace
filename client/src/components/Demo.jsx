import React from 'react'
import Button from './Button'
import roc from '../assets/images/rocket.png'

const Demo = () => {
    return (
        <div className='max-w-7xl mx-auto my-10  bg-gradient-to-t from-slate-800 to-black rounded-3xl text-white p-5 flex justify-between items-center '>

            <img src={roc} alt="roc" className='w-[250px] h-[250px] -mx-24 hidden lg:block' />
            <div className='flex items-center justify-evenly flex-col my-10 w-full md:w-[90%]'>
                <h1 className='text-4xl font-semibold my-5'>Contact Us for a Customized SEO Strategy</h1>
                <Button content="Schedule a demo" />
            </div>
        </div>
    )
}

export default Demo
