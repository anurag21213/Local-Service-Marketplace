import React from 'react';
import Loader from './Loader';

const LoginLoader = ({ isLoggingIn = true, fullScreen = true }) => {
    const messages = {
        login: 'Logging in...',
        logout: 'Logging out...',
        register: 'Creating account...',
        processing: 'Processing...'
    };

    return (
        <Loader
            message={isLoggingIn ? messages.login : messages.register}
            size="md"
            fullScreen={fullScreen}
        />
    );
};

export default LoginLoader; 