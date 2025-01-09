import React from 'react'
import bgimg2 from '../assets/images/img1.jpg'
const WorkCard = ({img,heading,des}) => {
  return (
    <div  >
        <div className='overflow-hidden w-[450px] h-[350px] rounded-2xl'>
            <img src={img} alt="img" className='w-full h-full  hover:scale-105 ease-in overflow-hidden'   />
        </div>
        <h1 className='text-3xl mt-3'>{heading}</h1>
        <p className='text-lg text-slate-200'>{des}</p>
    </div>
  )
}

export default WorkCard
