import React from 'react'
import HeroCard from '../HomeComponents/HeroCard'
import bgimg from '../../assets/images/img2.jpg'
import bgimg2 from '../../assets/images/img1.jpg'
import Button from '../Button'
import {Link} from 'react-router-dom'

const Hero = () => {
    return (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
            <div className='flex flex-col items-center justify-center space-y-8 md:space-y-16'>
                <div className='w-full max-w-7xl text-center'>
                    <h1 className='text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-semibold mb-6 md:mb-8'>
                        Home Assistance
                    </h1>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-lg md:text-xl text-slate-900'>
                        <div className='space-y-2'>
                            <h1 className='font-semibold'>Instant Help.</h1>
                            <h1 className='font-semibold'>Rapid Repair.</h1>
                            <h1 className='font-semibold'>Domestic Service.</h1>
                        </div>
                        <p className='max-w-xl text-center md:text-left'>
                        From service discovery to doorstep delivery, we simplify every step. Experience convenience redefined through our local service platform.
                        </p>
                    </div>
                </div>

                <div className='w-full bg-gradient-to-t from-slate-800 to-black rounded-3xl text-white p-6 md:p-8'>
                    <div className='flex justify-between items-center'>
                    <h1 className='text-xl md:text-2xl font-semibold mb-6'>What are you looking for?</h1>
                    <Link to={'/services'}><Button content="Explore Our Services" /></Link>
                    
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Hero