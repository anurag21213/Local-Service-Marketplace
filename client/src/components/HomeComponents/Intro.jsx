import React from 'react'
import { introdata } from '../../database/introdata'
import Introcard from './Introcard'

const Intro = () => {
    return (
        <div className='w-full  p-10 flex items-center justify-evenly flex-col md:flex-row'>
            <div className=' md:w-[30%] gap-y-20 flex flex-col items-center p-5'>
                <div className='flex items-center justify-start flex-col'>
                     <h1 className='text-5xl font-semibold'>What do we do?</h1>
                    
                    <p className='text-md'>We connect you with trusted local experts — from electricians to carpenters — all in one platform. Fast, reliable, and hassle-free home and personal services, just a few taps away.</p>
                </div>
                <div className='flex items-center justify-start flex-col'>
                    <h1 className='text-5xl font-semibold my-5'>Who are we?</h1>
                    <p className='text-md'>We are a local service marketplace committed to making your daily life easier. By bringing verified professionals right to your doorstep, we help you save time, avoid stress, and get things done — the smart way.</p>
                </div>
            </div>
            <div className='md:w-[60%] p-5'>
                {
                    introdata.map((item, index) => <Introcard key={index} heading={item.heading} des={item.des} />)
                }
            </div>
        </div>
    )
}

export default Intro
