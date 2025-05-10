import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography, Card, CardContent, Tabs, Tab, Avatar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faUserTie,
    faClipboardList,
    faMoneyBillWave,
    faStar,
    faExclamationTriangle,
    faDownload
} from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`admin-tabpanel-${index}`}
            aria-labelledby={`admin-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const AdminDashboard = () => {
    const [tabValue, setTabValue] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isPayoutLoading, setIsPayoutLoading] = useState(false);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProviders: 0,
        totalBookings: 0,
        totalRevenue: 0,
        averageRating: 0,
        pendingApprovals: 0
    });
    const [user,setUsers]=useState(0)
    const [payouts, setPayouts] = useState([]);
    const [processingPayment, setProcessingPayment] = useState(null);
    const [revenue,setRevenue]=useState(0)

    const handleGetPayouts = async () => {
        setIsPayoutLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/unpaid-this-week`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to fetch payouts');
            }
            console.log(data);

            setPayouts(data || []);
            setUsers(data.length)

            let rev=0;
            for(let i=0;i<data.length;i++){
                rev+=parseInt(data[i].unpaidAmount)
            }
            setRevenue(rev)
            toast.success("Payouts data loaded successfully!");
        } catch (error) {
            console.error('Error fetching payouts:', error);
            toast.error(error.message || "Failed to fetch payouts");
        } finally {
            setIsPayoutLoading(false);
        }
    };

    const handlePayment = async (providerId, amount) => {
        setProcessingPayment(providerId);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/process-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    providerId,
                    amount
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to process payment');
            }

            // Update the payouts list after successful payment
            setPayouts(prevPayouts =>
                prevPayouts.map(payout =>
                    payout._id === providerId
                        ? { ...payout, status: 'Paid' }
                        : payout
                )
            );

            toast.success("Payment processed successfully!");
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error(error.message || "Failed to process payment");
        } finally {
            setProcessingPayment(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('adminToken');

        const fetchData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/generate-weekly`, {
                    method: 'POST',
                    headers: {

                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch stats');
                }

                if (data) {
                    setStats({
                        totalUsers: data.totalUsers || 0,
                        totalProviders: data.totalProviders || 0,
                        totalBookings: data.totalBookings || 0,
                        totalRevenue: data.totalRevenue || 0,
                        averageRating: data.averageRating || 0,
                        pendingApprovals: data.pendingApprovals || 0
                    });
                }
            } catch (error) {
                console.error('Error fetching admin data:', error);
                toast.error("Failed to fetch dashboard data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const statCards = [
       
        {
            title: 'Service Providers',
            value: user,
            icon: <FontAwesomeIcon icon={faUserTie} size="2x" />,
            color: '#4caf50'
        },
        
        {
            title: 'Total Revenue',
            value: `₹${revenue}`,
            icon: <FontAwesomeIcon icon={faMoneyBillWave} size="2x" />,
            color: '#9c27b0'
        },
        
    ];

    if (isLoading) {
        return <Loader message="Loading Admin Dashboard..." />;
    }

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {/* Header */}
                <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, background: 'linear-gradient(45deg, #1a1a1a 30%, #333 90%)' }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                                Admin Dashboard
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                Manage your platform's operations
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                            <Button
                                variant="contained"
                                startIcon={<FontAwesomeIcon icon={faDownload} />}
                                onClick={handleGetPayouts}
                                disabled={isPayoutLoading}
                                sx={{
                                    backgroundColor: '#4caf50',
                                    '&:hover': {
                                        backgroundColor: '#388e3c'
                                    }
                                }}
                            >
                                {isPayoutLoading ? 'Downloading...' : 'Get Payouts'}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {statCards.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Box sx={{ color: stat.color, mb: 1 }}>
                                        {stat.icon}
                                    </Box>
                                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {stat.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Payouts Table */}
                <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Payouts
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<FontAwesomeIcon icon={faDownload} />}
                            onClick={handleGetPayouts}
                            disabled={isPayoutLoading}
                            sx={{
                                backgroundColor: '#4caf50',
                                '&:hover': {
                                    backgroundColor: '#388e3c'
                                }
                            }}
                        >
                            {isPayoutLoading ? 'Loading...' : 'Get Payouts'}
                        </Button>
                    </Box>

                    {payouts.length > 0 ? (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Provider Name</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Payment Rollout</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {payouts.map((payout, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{payout.name}</TableCell>
                                            <TableCell>₹{payout.unpaidAmount}</TableCell>
                                            <TableCell>{new Date(payout.date).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        color: payout.status === 'Paid' ? '#4caf50' : '#ff9800',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    Unpaid
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handlePayment(payout._id, payout.unpaidAmount)}
                                                    disabled={processingPayment === payout._id}
                                                    sx={{
                                                        backgroundColor: '#4caf50',
                                                        '&:hover': {
                                                            backgroundColor: '#388e3c'
                                                        }
                                                    }}
                                                >
                                                    {processingPayment === payout._id ? 'Processing...' : 'Pay Now'}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                            {isPayoutLoading ? 'Loading payouts...' : 'No payouts data available. Click "Get Payouts" to fetch data.'}
                        </Typography>
                    )}
                </Paper>

                {/* Main Content */}
                <Paper elevation={3} sx={{ borderRadius: 2 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            sx={{
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: '#666',
                                    '&.Mui-selected': {
                                        color: '#1a1a1a',
                                        fontWeight: 'bold',
                                    },
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#1a1a1a',
                                    height: 3,
                                }
                            }}
                        >
                            <Tab label="User Management" />
                            <Tab label="Provider Management" />
                            <Tab label="Bookings" />
                            <Tab label="Reports" />
                        </Tabs>
                    </Box>

                    <TabPanel value={tabValue} index={0}>
                        <Typography>User Management Content</Typography>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <Typography>Provider Management Content</Typography>
                    </TabPanel>

                    <TabPanel value={tabValue} index={2}>
                        <Typography>Bookings Content</Typography>
                    </TabPanel>

                    <TabPanel value={tabValue} index={3}>
                        <Typography>Reports Content</Typography>
                    </TabPanel>
                </Paper>

                {/* Recent Activity */}
                <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Recent Activity
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Add your recent activity items here */}
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default AdminDashboard; 