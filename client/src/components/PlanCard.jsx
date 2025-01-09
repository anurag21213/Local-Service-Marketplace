import React from 'react'
import { faRupee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './Button'

const PlanCard = ({heading,li,subh,des,btnval}) => {
    return (
        <div className='w-[400px] border border-slate-900 border-b-8 rounded-2xl p-5 my-5'>
            {
                heading?
                <h1 className='my-5 font-semibold text-4xl' ><FontAwesomeIcon icon={faRupee} className='mr-3' />{heading}</h1>:
                <h1 className='my-5 font-semibold text-4xl' >{subh}</h1>
            }
            {
                li?<ul className='w-full h-[600px] list-disc p-5 '>
                    {
                        li.map((item,index)=><li key={index} className='text-xl text-slate-900 my-5'>{item}</li>)
                    }
                
            </ul>:
            <ul className='w-full h-[500px] list-disc p-5 '>
                   
            </ul>

            }
            {
                des&&<p className='my-5 text-lg text-slate-900'>{des}</p>
            }
            
            <Button content={btnval} style="border border-slate-700" />
        </div>
    )
}

export default PlanCard
