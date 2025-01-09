import React, { useState } from 'react'

const FAQCom = ({q,a}) => {
    const [open, setOpen] = useState(false)

    const handleAns = () => {
        setOpen((prev) => !prev)
    }
    return (
        <div className='w-full border-t-2 border-b-2 border-slate-700'>
            <div className='flex items-center justify-between p-4'>
                <h1 className='text-xl'>{q}</h1>
                {
                    open ? <button className='text-4xl border-none outline-none p-2' onClick={handleAns}>-</button> :
                        <button className='text-4xl border-none outline-none p-2' onClick={handleAns}>+</button>
                }
            </div>
            {
                open && <div className='flex items-center justify-between p-4'>
                    <p className='text-xl'>{a}</p>
                </div>
            }

        </div>
    )
}

export default FAQCom
