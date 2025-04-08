import React from 'react'

import Button from '.././Button'




const HeroCard = ({ heading, btnval, imgval }) => {
    return (
        <div className='relative w-full aspect-[4/3] rounded-xl overflow-hidden group'>
            <img
                src={imgval}
                alt="bgimg"
                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/40 flex flex-col justify-between p-6'>
                <div className='flex flex-wrap items-center gap-4 text-white'>
                    <h1 className='text-lg md:text-xl'>Get services in </h1>
                    <h1 className='text-lg md:text-xl'>an hours at Rs.120</h1>
                </div>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xl md:text-3xl lg:text-4xl font-semibold text-white'>{heading}</h1>
                  
                </div>
            </div>
        </div>
    )
}

export default HeroCard