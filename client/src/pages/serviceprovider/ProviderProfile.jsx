import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Avatar, Grid } from '@mui/material';
import Navbar from '../../components/ProviderComponents/ProviderNavbar';
import { toast } from 'react-toastify';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../../store/slices/authSlice';

const ProviderProfile = () => {
  const token = useSelector(selectCurrentToken);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    serviceType: 'Plumbing',
    experience: '5 years',
    description: 'Professional plumbing services with 5 years of experience.',
    location: 'New York, NY',
    profileImage: ''
  });
  const user=useSelector(selectCurrentUser)

  

  // Initialize Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'provider-profile-photo'); // Using default upload preset

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME }/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setFormData(prev => ({
          ...prev,
          profileImage: data.secure_url
        }));
        toast.success('Profile image uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/updateSpProfile`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({profileImage:formData.profileImage})
      }); 
      if (!response.ok) {
        throw new Error('Failed to update profile. Please try again.');
      }
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
    console.log('Profile data:', formData);
  };

  // Create Cloudinary image instance
  const myImage = formData.profileImage
    ? cld.image(formData.profileImage.split('/').pop().split('.')[0])
      .resize(fill().width(200).height(200))
    : null;

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 'bold' }}>
            Provider Profile
          </Typography>

          <Grid container spacing={4}>
            {/* Profile Picture Section */}
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                {myImage ? (
                  <AdvancedImage
                    cldImg={myImage}
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }}
                    onClick={() => document.getElementById('image-upload').click()}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 200,
                      height: 200,
                      mb: 2,
                      backgroundColor: '#1a1a1a',
                      fontSize: '4rem',
                      cursor: 'pointer'
                    }}
                    onClick={() => document.getElementById('image-upload').click()}
                  >
                    {formData.name.charAt(0)}
                  </Avatar>
                )}
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <Button
                  variant="contained"
                  onClick={() => document.getElementById('image-upload').click()}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#1a1a1a',
                    '&:hover': {
                      backgroundColor: '#333'
                    }
                  }}
                >
                  Change Photo
                </Button>
              </Box>
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
                      value={user.name}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Service Type"
                      name="serviceType"
                      value={user.category}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Years of Experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={user.location}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{
                        backgroundColor: '#1a1a1a',
                        '&:hover': {
                          backgroundColor: '#333'
                        }
                      }}
                    >
                      Update Profile
                    </Button>
                  </Grid>
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
