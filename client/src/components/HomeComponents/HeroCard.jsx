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
                    <h1 className='text-lg md:text-xl'>Website Design</h1>
                    <h1 className='text-lg md:text-xl'>Website Development</h1>
                </div>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xl md:text-3xl lg:text-4xl font-semibold text-white'>{heading}</h1>
                    <Button content={btnval} />
                </div>
            </div>
        </div>
    )
}

export default HeroCard
