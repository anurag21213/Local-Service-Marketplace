import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectCurrentToken, setCredentials } from '../../store/slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';

function AvailabilityManager() {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [availability, setAvailability] = useState({
        isAvailable: true,
        servicePinCodes: [],
    });
    const [newPincode, setNewPincode] = useState('');



    const handleAvailabilityToggle = (event) => {
        setAvailability({
            ...availability,
            isAvailable: event.target.checked,
        });
    };

    const handleAddPincode = () => {
        if (newPincode && newPincode.length === 6 && !availability.servicePinCodes.includes(newPincode)) {
            setAvailability({
                ...availability,
                servicePinCodes: [...availability.servicePinCodes, newPincode],
            });
            setNewPincode('');
        }
    };

    const handleRemovePincode = (pincodeToRemove) => {
        setAvailability({
            ...availability,
            servicePinCodes: availability.servicePinCodes.filter(pincode => pincode !== pincodeToRemove),
        });
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/availability`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(availability)
            });

            const data = await response.json()
            console.log(data);


            if (data.message === "Availability updated") {
                const updatedUser = {
                    ...user,

                    servicePinCodes: data.user.servicePinCodes || user.servicePinCodes,
                    isAvailable: data.user.isAvailable || user.isAvailable

                }

                // Update the user data in Redux store
                dispatch(setCredentials({
                    user: updatedUser,
                    token: token
                }));

                // Update localStorage
                // localStorage.setItem('user', JSON.stringify(updatedUser));

                toast.success('Availability updated successfully!');
            } else {
                throw new Error('Failed to update availability');
            }
        } catch (error) {
            console.error('Error updating availability:', error);
            toast.error('Failed to update availability');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl text-blue-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Availability</h2>

            {/* Availability Toggle */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={availability.isAvailable}
                            onChange={handleAvailabilityToggle}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-gray-700 font-medium">Available for Services</span>
                    </label>
                </div>
            </div>

            {/* Service Pincodes */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Pincodes</h3>

                {/* Add Pincode Form */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={newPincode}
                                onChange={(e) => setNewPincode(e.target.value)}
                                placeholder="Enter 6-digit pincode"
                                maxLength={6}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-sm text-gray-500 mt-1">Enter 6-digit pincode</p>
                        </div>
                        <button
                            onClick={handleAddPincode}
                            disabled={!newPincode || newPincode.length !== 6}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Add Pincode</span>
                        </button>
                    </div>
                </div>

                {/* Pincode List */}
                <div className="flex flex-wrap gap-2">
                    {availability.servicePinCodes.map((pincode) => (
                        <div
                            key={pincode}
                            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full flex items-center gap-2"
                        >
                            <span>{pincode}</span>
                            <button
                                onClick={() => handleRemovePincode(pincode)}
                                className="text-gray-500 hover:text-red-500 focus:outline-none"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {availability.servicePinCodes.length === 0 && (
                    <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg">
                        No pincodes added yet. Add pincodes where you provide services.
                    </div>
                )}
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        <span>Saving...</span>
                    </>
                ) : (
                    <span>Save Changes</span>
                )}
            </button>
        </div>
    );
}

export default AvailabilityManager; 