import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
    try {
        const token = localStorage.getItem('token');
        return {
            user: null,
            token: token || null,
            isAuthenticated: !!token,
            isLoading: false,
            error: null,
        };
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return {
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        };
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        setCredentials: (state, action) => {
            try {
                const { user, token } = action.payload;
                state.user = user;
                state.token = token;
                state.isAuthenticated = true;
                state.error = null;
                localStorage.setItem('token', token);
            } catch (error) {
                console.error('Error setting credentials:', error);
                state.error = 'Failed to set credentials';
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            try {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = null;
                localStorage.removeItem('token');
            } catch (error) {
                console.error('Error during logout:', error);
                state.error = 'Failed to logout';
            }
        },
    },
});

export const { setCredentials, setLoading, setError, logout } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error; 