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

function ServiceRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
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
    }, [token]);

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
            toast.success('Request accepted successfully!');
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
    );
}

export default ServiceRequests; 