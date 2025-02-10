import React from 'react'
import Button from '../Button'
import seoimg from '../../assets/images/seoimg.png'

const Search = () => {
    return (
        <div className='flex items-center justify-between border-slate-600 border-b-2 p-5 flex-wrap '>

            <div className='p-5 lg:w-[50%]'>
                <h1 className='text-4xl font-semibold'>Search Engine Optimization</h1>
                <p className='text-2xl text-slate-900 my-5'>
                    Search engine optimization is an essential practice for any website looking to improve its visibility and attract more organic traffic. In today's digital age, most users rely on search engines like Google, Bing, or Yahoo to find information, products, and services they need.
                </p>
                <p className='text-2xl text-slate-900 my-5 '>
                    Search engine optimization is an essential practice for any website looking to improve its visibility and attract more organic traffic. In today's digital age, most users rely on search engines like Google, Bing, or Yahoo to find information, products, and services they need.
                </p>

                <Button content="Get A Free Audit" style="border border-b-8 border-slate-900" />
            </div>

            <img src={seoimg} alt='seo' className='h-[500px] w-[50%] rounded-3xl hidden lg:block ' />
        </div>
    )
}

export default Search
