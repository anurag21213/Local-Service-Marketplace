import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, Container, Paper, Grid, Card, CardContent, Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBriefcase,
    faClock,
    faStar,
    faLocationDot,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import ServiceRequests from './ServiceRequests';
import AvailabilityManager from './AvailabilityManager';
import Navbar from '../../components/ProviderComponents/ProviderNavbar';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authSlice';

function TabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`dashboard-tabpanel-${index}`}
            aria-labelledby={`dashboard-tab-${index}`}
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

function ProviderDashboard() {
    const [tabValue, setTabValue] = useState(0);
    const user = useSelector(selectCurrentUser)
    const [rating,setRating]=useState(0)
    const [activeRequests,setActiveRequests]=useState(0)
    // console.log(user);

    useEffect(()=>{
        const feed=user.completedService
        let rate=0

        for(let i=0;i<feed.length;i++){
            rate+=parseInt(feed[i].feedback.rating)
        }

        setRating(rate/feed.length)
    },[])

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


    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Mock data for dashboard stats
    const stats = [
        { title: 'Total Services', value: 1, icon: <FontAwesomeIcon icon={faBriefcase} size="2x" />, color: '#1a1a1a' },
        { title: 'Active Requests', value: activeRequests, icon: <FontAwesomeIcon icon={faClock} size="2x" />, color: '#2196f3' },
        { title: 'Rating', value: rating, icon: <FontAwesomeIcon icon={faStar} size="2x" />, color: '#ff9800' },
        { title: 'Service Area', value: user.servicePinCodes.length, icon: <FontAwesomeIcon icon={faLocationDot} size="2x" />, color: '#4caf50' }
    ];

    
    

    return (
        <Box>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {/* Welcome Section */}
                <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, background: 'linear-gradient(45deg, #1a1a1a 30%, #333 90%)' }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                                {`Welcome back, ${user.name}`}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                Here's what's happening with your services today
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                            <img src={user.profileImage} alt='user profile' className='h-[200px] w-[200px] rounded-full' />
                        </Grid>
                    </Grid>
                </Paper>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {stats.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
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
                            <Tab label="Service Requests" />
                            <Tab label="Availability" />
                        </Tabs>
                    </Box>

                    <TabPanel value={tabValue} index={0}>
                        <ServiceRequests setActiveRequests={setActiveRequests} />
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <AvailabilityManager />
                    </TabPanel>
                </Paper>

                {/* Recent Activity */}
                <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Recent Activity
                    </Typography>
                    <Grid container spacing={2}>
                        {user.completedService.map((item) => (
                            <Grid item xs={12} key={item}>
                                <Card sx={{ borderRadius: 2 }}>
                                    <CardContent>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Avatar sx={{ bgcolor: '#1a1a1a' }}>
                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                    {item.clientName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.clientEmail}
                                                </Typography>
                                                {item.feedback && (
                                                    <Box sx={{ mt: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                                                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                                            "{item.feedback.comment}"
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                            <FontAwesomeIcon
                                                                icon={faStar}
                                                                style={{ color: '#ffc107', marginRight: '4px' }}
                                                            />
                                                            <Typography variant="body2" color="text.secondary">
                                                                Rating {item.rating}/5
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                )}
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="caption" color="text.secondary">
                                                    {formatDate(item.completedAt)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default ProviderDashboard; 