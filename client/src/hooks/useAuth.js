import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    selectCurrentUser,
    selectIsAuthenticated,
    selectIsLoading,
    selectError,
    setCredentials,
    setLoading,
    setError,
    logout,
} from '../store/slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    const login = async (email, password, isProvider = false) => {
        try {
            dispatch(setLoading(true));
            const endpoint = isProvider ? 'spLogin' : 'clLogin';
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.token) {
                const userData = {
                    ...data.user,
                    isProvider,
                    ...(isProvider && {
                        services: data.user.services || [],
                        rating: data.user.rating || 0,
                        experience: data.user.experience || 0,
                        availability: data.user.availability || false,
                    }),
                };

                dispatch(setCredentials({ user: userData, token: data.token }));
                toast.success('Login successful!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                if (isProvider) {
                    navigate('/providerdashboard');
                } else {
                    navigate('/home');
                }

                return { success: true };
            } else {
                const errorMessage = data.message || 'Login failed';
                dispatch(setError(errorMessage));
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return { success: false, error: errorMessage };
            }
        } catch (err) {
            const errorMessage = err.message || 'An error occurred during login';
            dispatch(setError(errorMessage));
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return { success: false, error: errorMessage };
        } finally {
            dispatch(setLoading(false));
        }
    };

    const register = async (formData, isProvider = false) => {
        try {
            dispatch(setLoading(true));
            const endpoint = isProvider ? 'spSignup' : 'clSignup';
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/${endpoint}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.token) {
                const userData = {
                    ...data.user,
                    isProvider,
                    ...(isProvider && {
                        services: data.user.services || [],
                        rating: data.user.rating || 0,
                        experience: data.user.experience || 0,
                        availability: data.user.availability || false,
                    }),
                };

                dispatch(setCredentials({ user: userData, token: data.token }));
                toast.success('Registration successful!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                if (isProvider) {
                    navigate('/providerdashboard');
                } else {
                    navigate('/home');
                }

                return { success: true };
            } else {
                const errorMessage = data.message || 'Registration failed';
                dispatch(setError(errorMessage));
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return { success: false, error: errorMessage };
            }
        } catch (err) {
            const errorMessage = err.message || 'An error occurred during registration';
            dispatch(setError(errorMessage));
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return { success: false, error: errorMessage };
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleLogout = () => {
        try {
            dispatch(logout());
            toast.success('Logged out successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/login');
        } catch (error) {
            toast.error('Error during logout', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout: handleLogout,
    };
}; 