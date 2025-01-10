import React from 'react'
import { introdata } from '../database/introdata'
import Introcard from './Introcard'

const Intro = () => {
    return (
        <div className='w-full  p-10 flex items-center justify-evenly flex-col md:flex-row'>
            <div className=' md:w-[30%] gap-y-20 flex flex-col items-center p-5'>
                <h1 className='text-5xl font-semibold'>What do we do?</h1>
                <div className='flex items-center justify-start flex-col'>
                    <h1 className='text-5xl font-semibold my-5'>Who are we?</h1>
                    <p>We are digital marketing agency focused on delivering creative data driven solution.We are digital marketing agency focused on delivering creative data driven solution.</p>
                </div>
            </div>
            <div className='md:w-[60%] p-5'>
                {
                    introdata.map((item,index)=><Introcard key={index} heading={item.heading} des={item.des}  />)
                }
            </div>
        </div>
    )
}

export default Intro
