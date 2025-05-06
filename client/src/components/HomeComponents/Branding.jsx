import React from 'react'
import { brandData } from '../../database/brandData'

const Branding = () => {
  return (
    <div className='columns-1 sm:columns-2 lg:columns-3 py-10 md:p-20 gap-4 mx-auto  '>
      {
        brandData.map((item,index)=>
        <div key={index} className='mb-4 break-inside-avoid p-7 border-slate-900 border border-b-8 rounded-2xl drop-shadow-2xl flex flex-col items-center justify-center  ' >
            <h1 className='text-5xl font-semibold my-3'>{item.heading}</h1>
            {
                item.img&&<img src={item.img} alt="img" className='h-[350px] w-[450px]'  />
            }
            {
                item.subh&&<h1 className='text-2xl text-slate-900'>{item.subh}</h1>
            }
            <p className='text-xl text-slate-900 my-2'>{item.des}</p>
        </div>)
      }
    </div>
  )
}

export default Branding
