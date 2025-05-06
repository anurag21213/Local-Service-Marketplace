import React, { useState } from 'react'
import { faqData } from '../../database/faqData'
import FAQCom from './FAQCom'

const Faq = () => {
   
    return (
        <div className='flex items-center justify-center flex-col my-5'>
            <h1 className='text-4xl font-semibold my-5'>FAQ</h1>
            <p className='text-xl p-2'>Everything You Need to Know About Our Services</p>
            <p className='text-xl p-2 mb-5'>Got Questions? We’ve Got Answers.</p>

            <div className='md:w-[70%] '>
                {
                    faqData.map((item,index)=><FAQCom key={index} q={item.q} a={item.ans} />)
                }
            </div>

        </div>
    )
}

export default Faq
