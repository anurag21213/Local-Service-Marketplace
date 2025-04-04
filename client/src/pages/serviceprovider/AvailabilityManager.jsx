import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Switch,
    FormControlLabel,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { toast } from 'react-toastify';

function AvailabilityManager() {
    const [availability, setAvailability] = useState({
        isAvailable: true,
        workingHours: {
            start: '09:00',
            end: '17:00',
        },
        workingDays: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            sunday: false,
        },
    });

    const handleAvailabilityToggle = (event) => {
        setAvailability({
            ...availability,
            isAvailable: event.target.checked,
        });
    };

    const handleWorkingHoursChange = (field) => (event) => {
        setAvailability({
            ...availability,
            workingHours: {
                ...availability.workingHours,
                [field]: event.target.value,
            },
        });
    };

    const handleDayToggle = (day) => (event) => {
        setAvailability({
            ...availability,
            workingDays: {
                ...availability.workingDays,
                [day]: event.target.checked,
            },
        });
    };

    const handleSave = () => {
        // TODO: Implement save functionality to backend
        toast.success('Availability updated successfully!');
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Manage Availability
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={availability.isAvailable}
                            onChange={handleAvailabilityToggle}
                        />
                    }
                    label="Available for Services"
                />
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Working Hours
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Start Time"
                            type="time"
                            value={availability.workingHours.start}
                            onChange={handleWorkingHoursChange('start')}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="End Time"
                            type="time"
                            value={availability.workingHours.end}
                            onChange={handleWorkingHoursChange('end')}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Working Days
                </Typography>
                <Grid container spacing={2}>
                    {Object.entries(availability.workingDays).map(([day, isWorking]) => (
                        <Grid item xs={12} sm={6} md={4} key={day}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isWorking}
                                        onChange={handleDayToggle(day)}
                                    />
                                }
                                label={day.charAt(0).toUpperCase() + day.slice(1)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ mt: 2 }}
            >
                Save Changes
            </Button>
        </Box>
    );
}

export default AvailabilityManager; 