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

function ServiceRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch service requests from backend
        // This is a mock data for demonstration
        const mockRequests = [
            {
                id: 1,
                clientName: 'John Doe',
                serviceType: 'Plumbing',
                description: 'Leaky faucet in bathroom',
                status: 'pending',
                date: '2024-03-15',
                time: '10:00 AM',
            },
            {
                id: 2,
                clientName: 'Jane Smith',
                serviceType: 'Electrical',
                description: 'Power outlet not working',
                status: 'accepted',
                date: '2024-03-16',
                time: '2:00 PM',
            },
        ];
        setRequests(mockRequests);
        setLoading(false);
    }, []);

    const handleAcceptRequest = (requestId) => {
        // TODO: Implement accept request functionality
        toast.success('Request accepted successfully!');
    };

    const handleRejectRequest = (requestId) => {
        // TODO: Implement reject request functionality
        toast.error('Request rejected');
    };

    const getStatusColor = (status) => {
        switch (status) {
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

    if (loading) {
        return <Typography>Loading requests...</Typography>;
    }

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Service Requests
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Client</TableCell>
                            <TableCell>Service Type</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date & Time</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>{request.clientName}</TableCell>
                                <TableCell>{request.serviceType}</TableCell>
                                <TableCell>{request.description}</TableCell>
                                <TableCell>
                                    {request.date} {request.time}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={request.status}
                                        color={getStatusColor(request.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {request.status === 'pending' && (
                                        <Box>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                onClick={() => handleAcceptRequest(request.id)}
                                                sx={{ mr: 1 }}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => handleRejectRequest(request.id)}
                                            >
                                                Reject
                                            </Button>
                                        </Box>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ServiceRequests; 