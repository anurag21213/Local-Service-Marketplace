
import React from 'react'
import localimg from '../assets/images/HyperLocalImg.png'
import { useNavigate } from 'react-router-dom'

import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Particle from '../components/ParticleComponent/Particle'


const Cover = () => {


    const navigate = useNavigate()

   
    
    return (
        <div className='w-full h-screen flex flex-col lg:flex-row items-center justify-evenly '>
            <div className='z-10 flex items-center justify-center h-full '>

                <img className='w-[90%] h-[80%] ' src={localimg} alt={localimg} />

            </div>
            <div className='z-10 flex flex-col items-center justify-center gap-4 p-2 w-full lg:w-[40%]  '>
                <h1 className='text-3xl md:text-5xl'>Local Service Marketplace</h1>
                <h3>Continue as</h3>
                <div className='w-full flex items-center justify-evenly'>
                    

                    <button onClick={()=>navigate('/clientlogin')} className={`outline-none md:p-4 p-2 bg-black text-white text-lg md:text-xl rounded-3xl hover:scale-105 w-[200px] hover:bg-gradient-to-bl from-blue-400 to-slate-500`} >Client <FontAwesomeIcon icon={faArrowRight} /></button>
                    <button onClick={()=>navigate('/login')} className={`outline-none md:p-4 p-2 bg-black text-white text-lg md:text-xl rounded-3xl hover:scale-105 w-[200px] hover:bg-gradient-to-bl from-blue-400 to-slate-500`} >Service Provider <FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
            </div>

            <Particle/>
        </div>
    )
}

export default Cover
