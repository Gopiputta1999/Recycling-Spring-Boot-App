import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import SocialMedia from './SocialMedia';

function AdminFooter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  return (
    <AppBar position="static" color="secondary" component="footer" sx={{ top: 'auto', bottom: 0 }}>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="inherit" component={Link} to="/aboutUs">
            About Us
          </Button>
          {!isLoggedIn && (
            <Button color="inherit" component={Link} to="/signin">
              Join Us
            </Button>
          )}
          <Button color="inherit" component={Link} to="/feedback">
            Feedback
          </Button>
          <Button color="inherit" href="/donation">
            Donation
          </Button>
          <SocialMedia/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AdminFooter;
