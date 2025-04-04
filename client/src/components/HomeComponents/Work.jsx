import React from 'react'
import Button from '.././Button'
import WorkCard from './WorkCard'
import { wordData } from '../../database/wordData'
import { Link } from 'react-router-dom'

const Work = () => {
    return (
        <div className='w-full  bg-gradient-to-t from-slate-800 to-black rounded-3xl text-white p-5 '>
            <div className='flex items-center justify-between p-5'>
                <h1 className=' text-xl md:text-4xl font-semibold'>Our  Services</h1>
                <Link to={'/services'}><Button content="Explore services"  /></Link>
            </div>

            <div className='flex items-center justify-evenly flex-wrap'>
                {
                    wordData.map((item,index)=><WorkCard img={item.img} heading={item.heading} des={item.des} key={index}  />)
                }

            </div>
        </div>
    )
}

export default Work
