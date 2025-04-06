import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Avatar, Grid, Divider, Chip, Switch, FormControlLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser, selectIsAuthenticated } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../../store/slices/authSlice';
import Navbar from '../../components/ProviderComponents/ProviderNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faSave,
  faPlus,
  faTrash,
  faBriefcase,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faLanguage,
  faFileAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const ProviderProfile = () => {
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    languages: '',
    description: '',
    services: [],
    availability: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user?.isProvider) {
      toast.error('Please login as a service provider to access this page');
      navigate('/providerlogin');
    } else {
      // Initialize form data with user data
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        experience: user.experience || '',
        languages: user.languages?.join(', ') || '',
        description: user.description || '',
        services: user.services || [],
        availability: user.availability || false,
      });
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', description: '', price: '' }]
    }));
  };

  const removeService = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/provider/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          languages: formData.languages.split(',').map(lang => lang.trim())
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update Redux store with new user data
        dispatch(setCredentials({
          user: { ...user, ...formData },
          token: localStorage.getItem('token')
        }));
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  if (!user || !user.isProvider) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" sx={{
              color: '#1a1a1a',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: '32px' }} />
              Provider Profile
            </Typography>
            <Button
              variant="contained"
              onClick={() => setIsEditing(!isEditing)}
              startIcon={<FontAwesomeIcon icon={isEditing ? faSave : faEdit} />}
              sx={{
                backgroundColor: '#1a1a1a',
                '&:hover': { backgroundColor: '#333' },
                borderRadius: '20px',
                px: 3,
                py: 1
              }}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </Box>

          <Grid container spacing={4}>
            {/* Profile Picture Section */}
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  sx={{
                    width: 200,
                    height: 200,
                    mb: 2,
                    backgroundColor: '#1a1a1a',
                    fontSize: '4rem',
                    border: '4px solid #1a1a1a',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: '80px' }} />
                </Avatar>
                {isEditing && (
                  <Button
                    variant="contained"
                    sx={{
                      position: 'absolute',
                      bottom: 20,
                      right: 20,
                      minWidth: 'auto',
                      padding: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#1a1a1a'
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                )}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                {formData.name}
              </Typography>
              <Chip
                label={formData.availability ? "Available" : "Not Available"}
                color={formData.availability ? "success" : "error"}
                sx={{ mt: 1 }}
              />
            </Grid>

            {/* Profile Information Section */}
            <Grid item xs={12} md={8}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px', color: '#1a1a1a' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px', color: '#1a1a1a' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px', color: '#1a1a1a' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '8px', color: '#1a1a1a' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Years of Experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '8px', color: '#1a1a1a' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Languages (comma separated)"
                      name="languages"
                      value={formData.languages}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <FontAwesomeIcon icon={faLanguage} style={{ marginRight: '8px', color: '#1a1a1a' }} />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      variant="outlined"
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '8px', color: '#1a1a1a', alignSelf: 'flex-start', marginTop: '8px' }} />
                      }}
                    />
                  </Grid>

                  {/* Services Section */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 3 }} />
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FontAwesomeIcon icon={faBriefcase} /> Services
                      </Typography>
                      {isEditing && (
                        <Button
                          variant="contained"
                          onClick={addService}
                          startIcon={<FontAwesomeIcon icon={faPlus} />}
                          sx={{
                            backgroundColor: '#1a1a1a',
                            borderRadius: '20px',
                            px: 3
                          }}
                        >
                          Add Service
                        </Button>
                      )}
                    </Box>
                    {formData.services.map((service, index) => (
                      <Paper
                        key={index}
                        elevation={2}
                        sx={{
                          p: 3,
                          mb: 2,
                          borderRadius: '12px',
                          background: 'linear-gradient(to right, #ffffff, #f8f9fa)'
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="Service Name"
                              value={service.name}
                              onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                              variant="outlined"
                              disabled={!isEditing}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="Description"
                              value={service.description}
                              onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                              variant="outlined"
                              disabled={!isEditing}
                            />
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <TextField
                              fullWidth
                              label="Price (₹/hour)"
                              type="number"
                              value={service.price}
                              onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                              variant="outlined"
                              disabled={!isEditing}
                            />
                          </Grid>
                          {isEditing && (
                            <Grid item xs={12} sm={1} sx={{ display: 'flex', alignItems: 'center' }}>
                              <Button
                                color="error"
                                onClick={() => removeService(index)}
                                sx={{ minWidth: 'auto' }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                      </Paper>
                    ))}
                  </Grid>

                  {/* Availability */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 3 }} />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.availability}
                          onChange={handleChange}
                          name="availability"
                          disabled={!isEditing}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                          Available for new services
                        </Typography>
                      }
                    />
                  </Grid>

                  {/* Submit Button */}
                  {isEditing && (
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={<FontAwesomeIcon icon={faSave} />}
                        sx={{
                          backgroundColor: '#1a1a1a',
                          '&:hover': { backgroundColor: '#333' },
                          borderRadius: '20px',
                          py: 1.5,
                          mt: 2
                        }}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProviderProfile;
