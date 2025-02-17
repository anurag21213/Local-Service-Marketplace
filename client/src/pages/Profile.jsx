import React from 'react'
import profile from '../assets/images/profile.jpg'
import Navbar from '../components/Navbar'
import Button from '../components/Button'

const Profile = () => {
    return (
        <div >
            <Navbar />
            <div className='max-w-7xl mx-auto p-5 flex items-center justify-evenly'>
                <div className='w-[40%] rounded-lg overflow-hidden drop-shadow-xl '>
                    <img src={profile} alt='profile' className='' />
                    <div className='flex flex-col justify-center items-center p-5'>

                        <div className='flex items-center justify-between w-full  border-b-slate-600 border-b-2 my-2 p-2'>
                            <h1 className='text-2xl '>John Doe</h1>
                            <h1 className='text-lg'>+91-8795025915</h1>
                        </div>
                        <div className='flex items-center justify-between w-full  border-b-slate-600 border-b-2 my-2 p-2'>
                            <h1 className='text-2xl '>johndoe@gmail.com</h1>
                        </div>
                        <Button content="Edit Profile" style="my-2" />
                    </div>

                </div>
                <div className='w-[50%] h-[700px] overflow-y-scroll'>
                    
                        <div className='flex items-center justify-between w-full  border-b-slate-600 border-b-2 my-2 p-5'>
                            <h1 className='text-2xl '>Booked Appointment</h1>
                        </div>

                        <div>
                            <div className='flex gap-5 items-center p-2'>
                                <img src={profile} alt="service_provider_img" className='max-w-32 max-h-32 rounded-lg' />
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='text-xl'>Service Provider name</h1>
                                    <div className='w-full gap-5 flex items-center justify-between p-2 text-lg'>
                                        <p>Service Type</p>
                                        <p>+91-75663734848</p>
                                        <p className='text-green-700'>Estimated in 2 days</p>

                                    </div>
                                    
                                </div>


                            </div>
                            <div className='flex gap-5 items-center p-2'>
                                <img src={profile} alt="service_provider_img" className='max-w-32 max-h-32 rounded-lg' />
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='text-xl'>Service Provider name</h1>
                                    <div className='w-full gap-5 flex items-center justify-between p-2 text-lg'>
                                        <p>Service Type</p>
                                        <p>+91-75663734848</p>
                                        <p className='text-green-700'>Estimated in 2 days</p>

                                    </div>
                                    
                                </div>


                            </div>
                            <div className='flex gap-5 items-center p-2'>
                                <img src={profile} alt="service_provider_img" className='max-w-32 max-h-32 rounded-lg' />
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='text-xl'>Service Provider name</h1>
                                    <div className='w-full gap-5 flex items-center justify-between p-2 text-lg'>
                                        <p>Service Type</p>
                                        <p>+91-75663734848</p>
                                        <p className='text-green-700'>Estimated in 2 days</p>

                                    </div>
                                    
                                </div>


                            </div>
                            <div className='flex gap-5 items-center p-2'>
                                <img src={profile} alt="service_provider_img" className='max-w-32 max-h-32 rounded-lg' />
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='text-xl'>Service Provider name</h1>
                                    <div className='w-full gap-5 flex items-center justify-between p-2 text-lg'>
                                        <p>Service Type</p>
                                        <p>+91-75663734848</p>
                                        <p className='text-green-700'>Estimated in 2 days</p>

                                    </div>
                                    
                                </div>


                            </div>
                            <div className='flex gap-5 items-center p-2'>
                                <img src={profile} alt="service_provider_img" className='max-w-32 max-h-32 rounded-lg' />
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='text-xl'>Service Provider name</h1>
                                    <div className='w-full gap-5 flex items-center justify-between p-2 text-lg'>
                                        <p>Service Type</p>
                                        <p>+91-75663734848</p>
                                        <p className='text-green-700'>Estimated in 2 days</p>

                                    </div>
                                    
                                </div>


                            </div>
                            <div className='flex gap-5 items-center p-2'>
                                <img src={profile} alt="service_provider_img" className='max-w-32 max-h-32 rounded-lg' />
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='text-xl'>Service Provider name</h1>
                                    <div className='w-full gap-5 flex items-center justify-between p-2 text-lg'>
                                        <p>Service Type</p>
                                        <p>+91-75663734848</p>
                                        <p className='text-green-700'>Estimated in 2 days</p>

                                    </div>
                                    
                                </div>


                            </div>
                            <div className='flex gap-5 items-center p-2'>
                                <img src={profile} alt="service_provider_img" className='max-w-32 max-h-32 rounded-lg' />
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='text-xl'>Service Provider name</h1>
                                    <div className='w-full gap-5 flex items-center justify-between p-2 text-lg'>
                                        <p>Service Type</p>
                                        <p>+91-75663734848</p>
                                        <p className='text-green-700'>Estimated in 2 days</p>

                                    </div>
                                    
                                </div>


                            </div>
                        
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Profile
