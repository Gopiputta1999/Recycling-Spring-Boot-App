import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { firestore } from '../service/firebase'; // Import your Firestore instance
import { collection, addDoc } from 'firebase/firestore';
import { getDocs, query } from 'firebase/firestore';

const ContactUs = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modeOfContact, setModeOfContact] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = {
      name,
      email,
      modeOfContact,
      timestamp: new Date(),
    };
    try {
      await addDoc(collection(firestore, 'ContactUs'), contactData);
      setName('');
      setEmail('');
      setModeOfContact('');
      setReason('');
      onClose();
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Contact Us</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Mode of Contact"
            variant="outlined"
            fullWidth
            margin="normal"
            value={modeOfContact}
            onChange={(e) => setModeOfContact(e.target.value)}
            required
          />
          <TextField
            label="Reason"
            variant="outlined"
            fullWidth
            margin="normal"
            value={modeOfContact}
            onChange={(e) => setReason(e.target.value)}
            required
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUs;

