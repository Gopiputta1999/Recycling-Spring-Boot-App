import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth, db } from './../service/firebase'; // Adjust the path as necessary
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import PopModel from '../components/Model';

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

const Signin = () => {
  const navigate=useNavigate()
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [role, setRole] = useState('User');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
    confirmPass: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const newErrors = { email: '', password: '', confirmPass: '', name: '' };

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }
    if (!confirmPass) {
      newErrors.confirmPass = 'Confirm Password is required';
    } else if (confirmPass !== password) {
      newErrors.confirmPass = 'Passwords do not match';
    }
    if (!name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password && !newErrors.confirmPass && !newErrors.name) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password,confirmPass,name,role);
        const user = userCredential.user;
        // await setDoc(doc(db, 'users', user.uid), {
        //   name,
        //   email,
        //   role,
        // });
        console.log('User signed up:', user);
        navigate("/Login")
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPass('');

      } catch (error) { 
        console.log("=======",error.code)
        console.error('Error during signup:', error);
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('This email is already registered. Please use a different email.');
          setModalOpen(true); // Open the modal
        } else {
          setErrorMessage('An error occurred. Please try again.');
          setModalOpen(true);
        }
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setErrorMessage('');
  };

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.imageSection}>
        <img
          style={{
            height: '100%',
            objectFit: 'cover',
            borderRadius: '1rem',
            boxShadow: '0px 0px 37px #958282',
          }}
          src="https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/10.jpg"
          alt="Image 1"
          className="d-block w-100"
        />
      </Grid>
      <Grid item className={classes.formSection}>
        <Paper elevation={6} className={classes.formContainer}>
          <Typography variant="h4" className={classes.title}>
            Sign Up
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            InputProps={{
              style: { borderRadius: '16px' },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            className={classes.textField}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            InputProps={{
              style: { borderRadius: '16px' },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            className={classes.textField}
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
            className={classes.textField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: { borderRadius: '16px' },
            }}
          />
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            error={!!errors.confirmPass}
            helperText={errors.confirmPass}
            className={classes.textField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: { borderRadius: '16px', marginBottom: '16px' },
            }}
          />
          <FormControl variant="outlined" fullWidth className={classes.textField}>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role">
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            className={classes.submitButton}
          >
            Submit
          </Button>
          <Typography className={classes.signupText}>
            Already registered? <Link to="/Login">Login</Link>
          </Typography>
          <Typography className={classes.signupText}>
            Back to <Link to="/home">Home</Link>
          </Typography>
        </Paper>
      </Grid>
      <PopModel message={errorMessage} onClose={handleCloseModal} />
    </Grid>
  );
};

export default Signin;
