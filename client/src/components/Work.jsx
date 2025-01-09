import React from 'react'
import HeroCard from './HeroCard'
import bgimg from '../assets/images/img2.jpg'
import bgimg2 from '../assets/images/img1.jpg'
import Button from './Button'
import WorkCard from './WorkCard'
import { wordData } from '../database/wordData'

const Work = () => {
    return (
        <div className='w-full  bg-gradient-to-t from-slate-800 to-black rounded-3xl text-white p-5 '>
            <div className='flex items-center justify-between p-5'>
                <h1 className='text-4xl font-semibold'>Our  Work</h1>
                <Button content="Explore more of our work"  />
            </div>

            <div className='flex items-center justify-evenly'>
                {
                    wordData.map((item,index)=><WorkCard img={item.img} heading={item.heading} des={item.des} key={index}  />)
                }

            </div>
        </div>
    )
}

export default Work
