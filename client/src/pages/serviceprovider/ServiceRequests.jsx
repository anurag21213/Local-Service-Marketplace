import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../store/slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ServiceRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmed,setConfirmed]=useState(false);
    const [markCompleted,setMarkCompleted]=useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [booking,setBooking]=useState('')
    const token = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                setRequests(data.bookings);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch requests');
                setLoading(false);
            }
        };
        fetchRequests();


        let timer;
        if (resendDisabled && countdown > 0) {
          timer = setInterval(() => {
            setCountdown(prev => prev - 1);
          }, 1000);
        } else if (countdown === 0) {
          setResendDisabled(false);
          setCountdown(60);
        }
        return () => clearInterval(timer);
    }, [token,resendDisabled, countdown]);

    

    const handleAcceptRequest = async (bookingId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings/${bookingId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'Confirmed'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to accept request');
            }

            // Update the local state
            setRequests(requests.map(request =>
                request.bookingId === bookingId
                    ? { ...request, status: 'Accepted' }
                    : request
            ));
            setConfirmed(true)
            toast.success('Request Accepted successfully!');
        } catch (error) {
            toast.error('Failed to accept request');
        }
    };

    const handleRejectRequest = async (bookingId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings/${bookingId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'Rejected'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to reject request');
            }

            // Update the local state
            setRequests(requests.map(request =>
                request.bookingId === bookingId
                    ? { ...request, status: 'Rejected' }
                    : request
            ));
            toast.success('Request rejected successfully!');
        } catch (error) {
            toast.error('Failed to reject request');
        }
    };

    const handleOTP=async(bookingId)=>{
        try {
            setBooking(bookingId)
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings/${bookingId}/otp`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to send OTP');
            }

            // Update the local state
            setRequests(requests.map(request =>
                request.bookingId === bookingId
                    ? { ...request, status: 'default' }
                    : request
            ));
            setConfirmed(false)
            // setMarkCompleted(true)
            setShowOtpModal(true)
            toast.success('OTP sent successfully!');
        } catch (error) {
            toast.error('Failed to reject request');
        }
    }

    const handleMarkCompleted=async(bookingId)=>{
        try {
            setBooking(bookingId)
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings/${bookingId}/complete`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to mark Complete');
            }

            // Update the local state
            setRequests(requests.map(request =>
                request.bookingId === bookingId
                    ? { ...request, status: 'Complete' }
                    : request
            ));
            setConfirmed(false)
            setMarkCompleted(false)
            
            toast.success('Successfully Marked!');
        } catch (error) {
            toast.error('Failed to mark request');
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d*$/.test(pastedData)) {
          const newOtp = [...otp];
          for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
          }
          setOtp(newOtp);
        }
      };

      const handleVerifyOtp = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 6) {
          toast.error('Please enter a valid 6-digit OTP');
          return;
        }
    
        setOtpLoading(true);
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings/${booking}/verify-otp`, {
            method: 'POST',
            headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({ otp: otpString })
          });
          const data = await response.json();
          if (data.message==="OTP verified successfully") {
            toast.success('OTP verified successfully');
            setShowOtpModal(false);
            setMarkCompleted(true)
            // navigate('/clientlogin');
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          toast.error(error.message || 'Verification failed');
        } finally {
          setOtpLoading(false);
        }
      };

      const handleResendOtp = async () => {
        setResendDisabled(true);
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/resend-otp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: formData.email })
          });
          const data = await response.json();
          if (data.success) {
            toast.success('OTP resent successfully');
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          toast.error(error.message || 'Failed to resend OTP');
        }
      };

      const handleOtpChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
          const newOtp = [...otp];
          newOtp[index] = value;
          setOtp(newOtp);
    
          // Move to next input if current input is filled
          if (value && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
          }
        }
      };
    
      const handleKeyDown = (index, e) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
          document.getElementById(`otp-input-${index - 1}`).focus();
        }
      };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'warning';
            case 'accepted':
                return 'success';
            case 'rejected':
                return 'error';
            default:
                return 'default';
        }
    };

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

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <Typography>Loading requests...</Typography>
            </Box>
        );
    }

    return (
        <div>
        
        
        
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Service Requests
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Client Name</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Booking Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((request) => (
                            <TableRow key={request.bookingId}>
                                <TableCell>{request.clientName}</TableCell>
                                <TableCell>
                                    <Box>
                                        <Typography variant="body2">{request.clientPhone}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {request.clientEmail}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{request.serviceLocation}</TableCell>
                                <TableCell>{formatDate(request.bookingDate)}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={request.status}
                                        color={getStatusColor(request.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {request.status.toLowerCase() === 'pending' && (
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                onClick={() => handleAcceptRequest(request.bookingId)}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => handleRejectRequest(request.bookingId)}
                                            >
                                                Reject
                                            </Button>
                                        </Box>
                                    )}
                                    {
                                        confirmed&&(
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    onClick={() => handleOTP(request.bookingId)}
                                                >
                                                    Send OTP
                                                </Button>
                                            </Box>
                                        )
                                    }
                                    {
                                        markCompleted&&(
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    onClick={() => handleMarkCompleted(request.bookingId)}
                                                >
                                                    Mark As Complete
                                                </Button>
                                            </Box>
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                        {requests.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography color="text.secondary">
                                        No service requests found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

        {showOtpModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Enter OTP to complete booking</h2>
                      <button
                        onClick={() => setShowOtpModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
        
                    <p className="text-gray-600 mb-6">
                      Enter the 6-digit code sent to client Email
                    </p>
        
                    <div className="flex justify-between mb-6">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          type="text"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          maxLength={1}
                          className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          disabled={otpLoading}
                        />
                      ))}
                    </div>
        
                    <button
                      onClick={handleVerifyOtp}
                      disabled={otpLoading || otp.join('').length !== 6}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                    >
                      {otpLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
        
                    <button
                      onClick={handleResendOtp}
                      disabled={resendDisabled || otpLoading}
                      className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resendDisabled ? `Resend OTP (${countdown}s)` : 'Resend OTP'}
                    </button>
                  </div>
                </div>
              )}

        </div>
    );
}

export default ServiceRequests; 