import React from 'react'
import img from '../../assets/images/searchpic.png'
import { promoData } from '../../database/promoData'

const AboutSeo = () => {
    return (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 border-b-2 border-slate-700'>
            {/* Introduction Section */}
            <div className='max-w-3xl mx-auto mb-12'>
                <h1 className='text-3xl sm:text-4xl font-semibold mb-6'>Search Engine Optimization</h1>
                <p className='text-lg sm:text-xl md:text-2xl text-slate-900'>
                    Search engine optimization is an essential practice for any website looking to improve its visibility and attract more organic traffic. In today's digital age, most users rely on search engines like Google, Bing, or Yahoo to find information, products, and services they need.
                </p>
            </div>

            {/* Why SEO Section */}
            <div className='mb-12'>
                <h1 className='text-3xl sm:text-4xl font-semibold mb-8 text-center'>Why do we need SEO?</h1>
                <div className='bg-gradient-to-t from-slate-900 to-black rounded-3xl text-white p-6 md:p-8'>
                    <div className='flex flex-col lg:flex-row gap-8'>
                        <ul className='w-full lg:w-1/3 space-y-4'>
                            {[
                                'Increase Visibility',
                                'Build Credibility',
                                'Targeted Traffic',
                                'Better User Experience',
                                'Cost-Effective Marketing',
                                'Competitive Advantage',
                                'Brand Awareness',
                                'Higher Conversion Rates'
                            ].map((item, index) => (
                                <li key={index} className='text-lg md:text-xl border-b border-slate-700 py-4 text-center hover:bg-slate-800/50 transition-colors duration-300 rounded-lg'>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className='w-full lg:w-2/3 bg-white rounded-3xl p-6 md:p-8 flex flex-col items-center'>
                            <img
                                src={img}
                                alt="SEO illustration"
                                className='w-full max-w-[300px] h-auto mb-6 transform hover:scale-105 transition-transform duration-300'
                            />
                            <p className='text-lg md:text-xl text-slate-900 text-center'>
                                Search engine optimization is an essential practice for any website looking to improve its visibility and attract more organic traffic. In today's digital age, most users rely on search engines like Google, Bing, or Yahoo to find information, products, and services they need.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className='text-center'>
                <h1 className='text-3xl sm:text-4xl font-semibold mb-8'>Why Choose Us</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {promoData.map((item, index) => (
                        <div key={index} className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                            <img
                                src={item.img}
                                alt={item.des}
                                className='w-full h-48 object-cover'
                            />
                            <p className='text-lg p-6 text-slate-900'>{item.des}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutSeo
