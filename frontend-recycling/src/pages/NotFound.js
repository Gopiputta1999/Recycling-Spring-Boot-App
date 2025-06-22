import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleRedirect = () => {
    if (isLoggedIn) {
      navigate('/'); // Redirect to Home if logged in
    } else {
      navigate('/login'); // Redirect to Login if not logged in
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: isSmallScreen ? '20px' : '40px',
      }}
    >
      <Box mb={3}>
        <img
          src="https://via.placeholder.com/400x300.png?text=404+Error" // Replace with your image URL
          alt="404 Not Found"
          style={{
            maxWidth: isSmallScreen ? '80%' : '100%',
            height: 'auto',
            borderRadius: '8px',
          }}
        />
      </Box>
      <Typography 
        variant={isSmallScreen ? "h4" : "h3"} 
        component="h1" 
        gutterBottom
      >
        Page Not Found
      </Typography>
      <Typography 
        variant={isSmallScreen ? "body2" : "body1"} 
        color="textSecondary" 
        paragraph
        style={{
          maxWidth: isSmallScreen ? '80%' : '100%',
          marginBottom: isSmallScreen ? '16px' : '24px',
        }}
      >
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirect}
        style={{
          marginTop: '20px',
          padding: isSmallScreen ? '8px 16px' : '12px 24px',
          fontSize: isSmallScreen ? '0.875rem' : '1rem',
        }}
      >
        {isLoggedIn ? 'Go to Home Page' : 'Go to Login Page'}
      </Button>
    </Container>
  );
};

export default NotFound;
