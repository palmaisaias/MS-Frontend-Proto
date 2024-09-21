import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the token from the URL (if sent via query params)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('authToken', token);
      console.log('Token stored successfully:', token);

      // Redirect to the desired page after successful login
      navigate('/vision-boards');
    } else {
      console.error('No token found in the URL');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
