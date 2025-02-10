import React from 'react'

const Introcard = ({heading,des}) => {
    return (
        <div className='bg-gradient-to-t from-slate-800 to-black p-6 text-white rounded-2xl my-5'>
            <h1 className='text-4xl font-semibold mb-5'>{heading}</h1>
            <p>{des}</p>
        </div>
    )
}

export default Introcard
