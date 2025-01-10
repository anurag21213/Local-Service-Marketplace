import React from 'react'

import Button from './Button'




const HeroCard = ({heading,btnval,imgval}) => {
    return (
        <div className='w-[350px] h-[300px]   md:w-[550px] md:h-[400px] rounded-xl overflow-hidden my-5  ' >
            <div className='absolute w-[350px] h-[300px]  md:w-[550px] md:h-[400px]  '>
                <div className='flex items-center gap-x-5 p-4 text-2xl'>
                    <h1>Website Design</h1>
                    <h1>Website Development</h1>
                </div>
                <div className='flex w-full mt-[130px] md:mt-[250px] p-4 items-center justify-between'>
                    <h1 className=' text-xl md:text-4xl'>{heading}</h1>
                    <Button content={btnval}  />
                </div>
            </div>
            <img src={imgval} alt="bgimg" className='w-full h-full' />
        </div>
    )
}

export default HeroCard
