import React from 'react'
import img from '../assets/images/searchpic.png'
import { promoData } from '../database/promoData'


const AboutSeo = () => {
    return (
        <div className='p-5 border-b-2 border-slate-700'>
            <div className='p-5 w-full lg:w-[60%]'>
                <h1 className='text-4xl font-semibold'>Search Engine Optimization</h1>
                <p className='text-2xl text-slate-900 my-5'>
                    Search engine optimization is an essential practice for any website looking to improve its visibility and attract more organic traffic. In today's digital age, most users rely on search engines like Google, Bing, or Yahoo to find information, products, and services they need.
                </p>
            </div>
            <div className='p-10 '>
                <h1 className='text-4xl font-semibold my-5'>Why do we need SEO?</h1>
                <div className='bg-gradient-to-t from-slate-900 to-black rounded-3xl text-white p-5 flex items-center justify-evenly lg:flex-row flex-col'>
                    <ul className='p-5 md:w-[30%] w-full my-5 '>
                        <li className='text-xl border-b-2 border-slate-700 py-5 text-center' >Increase Visibility</li>
                        <li className='text-xl border-b-2 border-slate-700 py-5 text-center' >Build Credibility</li>
                        <li className='text-xl border-b-2 border-slate-700 py-5 text-center' >Increase Visibility</li>
                        <li className='text-xl border-b-2 border-slate-700 py-5 text-center' >Build Credibility</li>
                        <li className='text-xl border-b-2 border-slate-700 py-5 text-center' >Increase Visibility</li>
                        <li className='text-xl border-b-2 border-slate-700 py-5 text-center' >Build Credibility</li>
                        <li className='text-xl border-b-2 border-slate-700 py-5 text-center' >Increase Visibility</li>
                        <li className='text-xl border-b-2 border-slate-700 py-5 text-center' >Build Credibility</li>
                        
                    </ul>
                    <div className='bg-white rounded-3xl flex items-center justify-center text-black flex-col p-5 my-5 md:w-[50%]'>
                        <img src={img} alt="img" className='w-[300px] h-[300px]'  />
                        <p className='p-10 text-xl'>Search engine optimization is an essential practice for any website looking to improve its visibility and attract more organic traffic. In today's digital age, most users rely on search engines like Google, Bing, or Yahoo to find information, products, and services they need.</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center flex-col'>
                <h1 className='text-4xl font-semibold my-5'>Why Choose Us</h1>
                <div className='flex items-center justify-evenly w-full flex-col lg:flex-row '>
                    {
                        promoData.map((item,index)=><div key={index} className='w-[350px] flex items-center justify-center flex-col p-2 flex-wrap '>
                            <img src={item.img} alt="img" className='w-full h-[300px]' />
                            <p className='text-lg my-5'>{item.des}</p>
                        </div>)
                    }
                </div>
            </div>

        </div>
    )
}

export default AboutSeo
