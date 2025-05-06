import React from 'react'
// import bgimg2 from '../assets/images/img1.jpg'
const WorkCard = ({img,heading,des}) => {
  return (
    <div  className='flex flex-col justify-center items-center'>
        <div className='overflow-hidden w-[350px] h-[300px]  md:w-[450px] md:h-[350px]  my-3 flex items-center justify-center flex-col'>
            <img src={img} alt="img" className='w-full h-full border-gray-500 border-1  hover:scale-105 hover:rounded-2xl ease-in overflow-hidden rounded-2xl'   />
            
        </div>
        <h1 className='text-3xl mt-3 font-semibold'>{heading}</h1>
        <p className='text-lg '>{des}</p>
        
    </div>
  )
}

export default WorkCard
