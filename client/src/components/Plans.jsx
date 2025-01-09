import React from 'react'
import Button from './Button'
import { planData } from '../database/PanData'
import PlanCard from './PlanCard'

const Plans = () => {
    return (
        <div className='p-10 md:p-20 my-5 '>
            <h1 className='text-5xl font-semibold my-2'>Pricing Plans</h1>
            <p className='text-lg text-slate-900'>Tailored solutions to fit your business needs and budgets.</p>
            <div className='flex items-center justify-evenly max-w-8xl mx-auto flex-wrap'>
                {
                    planData.map((item,index)=><PlanCard key={index} heading={item.heading} subh={item.subh} li={item.li} des={item.des} btnval={item.btnval} />)
                }
            </div>
        </div>
    )
}

export default Plans
