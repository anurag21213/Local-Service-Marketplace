import React from 'react'
import HeroCard from '../HomeComponents/HeroCard'
import bgimg from '../../assets/images/img2.jpg'
import bgimg2 from '../../assets/images/img1.jpg'

const Hero = () => {
    return (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
            <div className='flex flex-col items-center justify-center space-y-8 md:space-y-16'>
                <div className='w-full max-w-7xl text-center'>
                    <h1 className='text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-semibold mb-6 md:mb-8'>
                        Intensional Impact
                    </h1>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-lg md:text-xl text-slate-900'>
                        <div className='space-y-2'>
                            <h1 className='font-semibold'>Digital Strategy.</h1>
                            <h1 className='font-semibold'>Creative Impact.</h1>
                            <h1 className='font-semibold'>Real Results.</h1>
                        </div>
                        <p className='max-w-xl text-center md:text-left'>
                            From Campaigns to design, we create strategies that engage and visuals that captivate.
                            Elevate your brand with a complete digital experience.
                        </p>
                    </div>
                </div>

                <div className='w-full bg-gradient-to-t from-slate-800 to-black rounded-3xl text-white p-6 md:p-8'>
                    <h1 className='text-xl md:text-2xl font-semibold mb-6'>Our Latest Work</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
                        <HeroCard heading="HAZE PRODUCTIONS" btnval="View Work" imgval={bgimg} />
                        <HeroCard heading="SMART WEALTH.AI" btnval="View Work" imgval={bgimg2} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
