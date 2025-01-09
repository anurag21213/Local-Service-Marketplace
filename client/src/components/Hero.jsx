import React from 'react'
import HeroCard from './HeroCard'
import bgimg from '../assets/images/img2.jpg'
import bgimg2 from '../assets/images/img1.jpg'

const Hero = () => {
  return (
    <div className='p-5  flex flex-col items-center justify-center  mx-auto my-5 gap-y-10 md:gap-y-20'>
        <div className='w-7xl flex flex-col items-center justify-center'>
            <h1 className='text-9xl font-semibold my-5 '>Intensional Impact</h1>
            <div className='flex items-center justify-between  w-full font-semibold text-xl text-slate-900 '>
                <div>
                    <h1>Digital Strategy.</h1>
                    <h1>Creative Impact.</h1>
                    <h1>Real Results.</h1>
                </div>
                <h1>
                    From Campaigns to design ,we create startegies that engage and visuals that captivate.<br/>Elevate your brand with a complete digital experience.
                </h1>
            </div>
        </div>

        <div className='w-full  bg-gradient-to-t from-slate-800 to-black rounded-3xl text-white p-5 '>
            <h1>Our Latest Work</h1>
            <div className='flex items-center justify-evenly'>
                <HeroCard heading="HAZE PRODUCTIONS" btnval="View Work" imgval={bgimg} />
                <HeroCard heading="SMART WEALTH.AI" btnval="View Work" imgval={bgimg2} />
               
            </div>
        </div>
    </div>
  )
}

export default Hero
