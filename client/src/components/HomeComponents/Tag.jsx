import React from 'react'
import Button from '.././Button'

const Tag = () => {
  return (
    <div className='w-full  bg-gradient-to-t from-slate-800 to-slate-700 rounded-3xl text-white p-5 '>
            <div className='flex items-center justify-between p-5 flex-col'>
                <h1 className='text-5xl font-semibold mt-3'>Let's Amplify,</h1>
                <h1 className='text-5xl font-semibold my-5'>Your Brand's Impact</h1>
                
                <Button content="Schedule a call"  />
            </div>

            
        </div>
  )
}

export default Tag
