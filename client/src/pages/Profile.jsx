import React, { useState } from 'react'
import profile from '../assets/images/profile.jpg'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, selectCurrentToken, setCredentials } from '../store/slices/authSlice'
import { faEdit, faSave, faUser, faEnvelope, faPhone, faCalendarAlt, faMapMarkerAlt, faStar, faCheckCircle, faShieldAlt, faSpinner,faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Profile = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        servicePinCode: user?.servicePinCode || '',
        category: user?.category || ''
    })

    // console.log(token);


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (!token) {
                console.error('No authentication token found')
                setIsLoading(false)
                return
            }

            const { category, servicePinCode, ...rest } = formData
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/profile`, {
                method: 'PUT',
                body: JSON.stringify({ category, servicePinCode }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) {
                if (response.status === 403) {
                    console.error('Authentication failed. Please log in again.')
                    setIsLoading(false)
                    return
                }
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            // console.log("data",data);
            if (data.message==="Client profile updated successfully") {
                // Create updated user object with all necessary fields
                const updatedUser = {
                    ...user,
                    name: data.client.name || user.name,
                    email: data.client.email || user.email,
                    phone: data.client.phone || user.phone,
                    servicePinCode: data.client.servicePinCode || user.servicePinCode,
                    category: data.client.category || user.category,
                    isVerified: data.client.isVerified ?? user.isVerified,
                    createdAt: data.client.createdAt || user.createdAt,
                    updatedAt: data.clientupdatedAt || user.updatedAt
                }

                // console.log(updatedUser);
                

                // Update Redux store with the complete user data
                dispatch(setCredentials({
                    user: updatedUser,
                    token: token
                }))

                // Update form data with the new values
                setFormData(prev => ({
                    ...prev,
                    name: data.name || prev.name,
                    email: data.email || prev.email,
                    phone: data.phone || prev.phone,
                    servicePinCode: data.servicePinCode || prev.servicePinCode,
                    category: data.category || prev.category
                }))

                // Exit edit mode after successful update
                setIsEditing(false)
            }
        } catch (error) {
            console.error('Error updating profile:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            {isLoading && <Loader message="Updating profile..." />}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                            <div className="relative">
                                <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500"></div>
                                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                                    <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                                        <img
                                            src={profile}
                                            alt="profile"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-20 pb-8 px-6">
                                {isEditing ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="flex-1 bg-transparent border-none focus:outline-none text-lg"
                                                    placeholder="Full Name"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="flex-1 bg-transparent border-none focus:outline-none text-lg"
                                                    placeholder="Email"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                                <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="flex-1 bg-transparent border-none focus:outline-none text-lg"
                                                    placeholder="Phone Number"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="servicePinCode"
                                                    value={formData.servicePinCode}
                                                    onChange={handleChange}
                                                    className="flex-1 bg-transparent border-none focus:outline-none text-lg"
                                                    placeholder="Pincode"
                                                    maxLength="6"
                                                />
                                            </div>
                                            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    className="flex-1 bg-transparent border-none focus:outline-none text-lg"
                                                    placeholder="Category"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={isLoading}
                                        >
                                            <FontAwesomeIcon icon={faSave} />
                                            <span>Save Changes</span>
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center space-y-6">
                                        <div>
                                            <div className="flex items-center justify-center gap-2">
                                                <h2 className="text-2xl font-bold text-gray-800">{user?.name || 'User Name'}</h2>
                                                {user?.isVerified && (
                                                    <div className="flex items-center gap-1 bg-blue-50 text-green-600 px-2 py-1 rounded-full text-sm">
                                                        <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
                                                        <span>Verified</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-gray-500">Member since 2024</p>
                                            <div className="flex items-center justify-center gap-1 mt-2">
                                                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                                                <span className="text-gray-600">4.8 Rating</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center justify-center space-x-3 text-gray-600">
                                                <FontAwesomeIcon icon={faEnvelope} />
                                                <span>{user?.email || 'user@example.com'}</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-3 text-gray-600">
                                                <FontAwesomeIcon icon={faPhone} />
                                                <span>{user?.phone || '+91-XXXXXXXXXX'}</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-3 text-gray-600">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                <span>{user?.servicePinCode || 'XXXXXX'}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                            <span>Edit Profile</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Appointments Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-[1.01] transition-transform duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600" />
                                    Booked Appointments
                                </h2>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {`${user.bookings.length} Active`}
                                </span>
                            </div>
                            <div className="space-y-4">
                                {user.bookings.map((item) => (
                                    <div key={item} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300 border border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={item.spProfile}
                                                alt="service provider"
                                                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-semibold text-gray-800">{item.serviceProviderName}</h3>
                                                    {item.status==="Completed"?<span className="text-green-600 font-medium flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faCheckCircle} />
                                                        <span>Confirmed</span>
                                                    </span>:<span className="text-yellow-600 font-medium flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faClock} />
                                                        <span>Pending</span>
                                                    </span>}
                                                    
                                                    {item.paymentStatus==="Paid"?<span className="text-green-600 font-medium flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faCheckCircle} />
                                                        <span>Payment Done</span>
                                                    </span>:<span className="text-yellow-600 font-medium flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faClock} />
                                                        <span>Payment Pending</span>
                                                    </span>}
                                                </div>
                                                <div className="flex items-center justify-between mt-2 text-sm">
                                                    <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{item.serviceCategory}</span>
                                                    <span className="text-gray-600">{item.serviceProviderPhone}</span>
                                                    <span className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">{formatDate(item.serviceDate)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Profile
