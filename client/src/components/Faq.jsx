import React, { useState } from 'react'
import { faqData } from '../database/faqData'
import FAQCom from './FAQCom'

const Faq = () => {
   
    return (
        <div className='flex items-center justify-center flex-col'>
            <h1 className='text-4xl font-semibold my-5'>FAQ</h1>
            <p className='text-xl p-2'>Looking to learn about more paid serach services for your business?</p>
            <p className='text-xl p-2 mb-5'>Browse our FAQ's</p>

            <div className='md:w-[70%] '>
                {
                    faqData.map((item,index)=><FAQCom key={index} q={item.q} a={item.ans} />)
                }
            </div>

        </div>
    )
}

export default Faq
