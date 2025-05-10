import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { faArrowRight, faRupee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '../../store/slices/authSlice'
import Loader from '../Loader'

const PlanCard = ({ heading, li, subh, des, plan }) => {
    const token = useSelector(selectCurrentToken)
    const user = useSelector(selectCurrentUser)
    const navigate = useNavigate()
    const [isPaymentLoading, setIsPaymentLoading] = useState(false)
    const [isVerifyingPayment, setIsVerifyingPayment] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState('')

    const handlePayment = async () => {
        try {
            setIsPaymentLoading(true)
            setPaymentStatus('Initializing payment...')
            const orderResp = await fetch(`${import.meta.env.VITE_BASE_URL}/api/subscribe/initiate`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ plan: plan })
            });

            if (!orderResp.ok) {
                throw new Error('Failed to create order');
            }

            const order = await orderResp.json();
            console.log(order);

            const options = {
                key: "rzp_test_NNN6WHXU4wxjmS",
                amount: parseInt(order.amount),
                currency: 'INR',
                name: 'Local Service Marketplace',
                description: 'Service Payment',
                image: 'https://example.com/logo.png',
                order_id: order.orderId,
                handler: async function (response) {
                    try {
                        setIsVerifyingPayment(true)
                        setPaymentStatus('Verifying payment...')
                        const verifyResp = await fetch(`${import.meta.env.VITE_BASE_URL}/api/subscribe/verify`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                plan: plan,
                                token: token
                            })
                        });

                        if (!verifyResp.ok) {
                            throw new Error('Verification failed');
                        }

                        const verifyData = await verifyResp.json();

                        if (verifyData.status === 200 || verifyData.success) {
                            toast.success('Payment verified successfully!');
                            navigate('/providerdashboard');
                        } else {
                            toast.error('Payment verification failed.');
                        }

                    } catch (err) {
                        console.error('Verification error:', err);
                        toast.error('Error in verifying payment');
                    } finally {
                        setIsVerifyingPayment(false)
                        setPaymentStatus('')
                    }
                },
                prefill: {
                    name: user?.name || 'Customer',
                    email: user?.email || 'user@example.com',
                    contact: user?.phone || '9000090000'
                },
                notes: {
                    address: 'Local Service Pvt. Ltd.'
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Payment error:', error);
            toast.error("Error in subscription payment");
        } finally {
            setIsPaymentLoading(false)
            setPaymentStatus('')
        }
    }

    return (
        <>
            {isPaymentLoading && <Loader message={paymentStatus || "Processing Payment..."} />}
            {isVerifyingPayment && <Loader message={paymentStatus || "Verifying Payment..."} />}
            <div className='w-[400px] border border-slate-900 border-b-8 rounded-2xl p-5 my-5'>
                {heading ? (
                    <h1 className='my-5 font-semibold text-3xl'>
                        <FontAwesomeIcon icon={faRupee} className='mr-3' />
                        {heading}
                    </h1>
                ) : (
                    <h1 className='my-5 font-semibold text-3xl'>{subh}</h1>
                )}
                {li ? (
                    <ul className='w-full min-h-[600px] list-disc p-5'>
                        {li.map((item, index) => (
                            <li key={index} className='text-xl text-slate-900 my-5'>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <ul className='w-full h-[500px] list-disc p-5'></ul>
                )}
                {des && <p className='my-5 text-lg text-slate-900'>{des}</p>}

                <button
                    onClick={handlePayment}
                    disabled={isPaymentLoading || isVerifyingPayment}
                    className='border md:p-4 p-2 bg-white text-black text-lg md:text-xl rounded-3xl hover:scale-105 hover:bg-gradient-to-bl from-blue-400 to-slate-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {isPaymentLoading || isVerifyingPayment ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-2"></div>
                            {paymentStatus || "Processing..."}
                        </div>
                    ) : (
                        <>I Prefer this <FontAwesomeIcon icon={faArrowRight} /></>
                    )}
                </button>
            </div>
        </>
    )
}

export default PlanCard
