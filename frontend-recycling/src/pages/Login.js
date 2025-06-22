import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, Paper, IconButton, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth } from './../service/firebase'; // Adjust the path as necessary
import { signInWithEmailAndPassword } from 'firebase/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column', // Stack elements on small screens
    },
  },
  imageSection: {
    backgroundImage: 'url(https://source.unsplash.com/random)', // Replace with your image URL
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '50%',
    padding: '2rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Full width on small screens
      height: '30vh', // Optional: Adjust height on small screens
    },
  },
  formSection: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '64px',
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Full width on small screens
      padding: '32px', // Reduce padding on small screens
    },
  },
  formContainer: {
    width: '80%',
    height: '75vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    gap: '24px',
    overflow: 'auto',
  },
  title: {
    marginBottom: '32px',
    textAlign: 'center',
    padding: '0.5rem',
    fontSize: '1.5rem', // Adjust font size for title
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem', // Smaller font size on small screens
    },
  },
  textField: {
    marginBottom: '16px',
    borderRadius: '2rem',
    width: '100%', // Full width for text fields
  },
  submitButton: {
    marginTop: '16px',
    height: '3rem',
    width: '100%', // Full width for button
  },
  signupText: {
    marginTop: '16px',
    textAlign: 'center',
    fontSize: '0.875rem', // Smaller text size for signup text
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem', // Smaller font size on small screens
    },
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [adminKey, setAdminKey] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    adminKey: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const newErrors = { email: '', password: '', adminKey: '' };
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    // Validate admin key if the role is Admin
    if (role === 'Admin' && adminKey !== 'TARAK') {
      newErrors.adminKey = 'Invalid admin key';
    }
    
    setErrors(newErrors);
    
    if (!newErrors.email && !newErrors.password && (!newErrors.adminKey || role === 'User')) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userToken = userCredential.user.accessToken;
        
        // Store auth token and role in local storage
        localStorage.setItem('authToken', userToken);
        localStorage.setItem('userRole', role); // Save role as User or Admin

        navigate('/dashboard');
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          setErrors({ ...newErrors, email: 'No account found with this email' });
        } else if (error.code === 'auth/wrong-password') {
          setErrors({ ...newErrors, password: 'Incorrect password' });
        } else if (error.code === 'auth/invalid-email') {
          setErrors({ ...newErrors, email: 'Invalid email format' });
        } else if (error.code === 'auth/invalid-credential') {
        setErrors({ ...newErrors, email: 'Invalid Login Credentials' });
        } else {
          setErrors({ ...newErrors, email: 'An unexpected error occurred. Please try again.' });
        }
        console.error('Error logging in:', error.message);
      }

      setEmail('');
      setPassword('');
      setAdminKey('');
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.imageSection}>
        <img
          style={{
            height: "100%",
            objectFit: "cover",
            borderRadius: "1rem",
            boxShadow: "0px 0px 37px #958282"
          }}
          src="https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/10.jpg"
          alt="Image 1"
          className="d-block w-100"
        />
      </Grid>
      <Grid item className={classes.formSection}>
        <Paper elevation={6} className={classes.formContainer}>
          <Typography variant="h4" className={classes.title}>Login</Typography>

          <FormControl variant="outlined" fullWidth className={classes.textField}>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role">
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Conditionally rendered Admin Key input */}
          {role === 'Admin' && (
            <TextField
              label="Admin Key"
              variant="outlined"
              fullWidth
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              error={!!errors.adminKey}
              helperText={errors.adminKey}
            />
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>

          <Typography className={classes.signupText}>
            If not registered, please <Link to="/signin">sign up</Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
