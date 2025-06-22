import React from 'react'
import { useState } from 'react';
import "../css/Donation.css";

function Donation() {
    const [donationAmount, setDonationAmount] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const handleDonation = (amount) => {
    setDonationAmount(amount);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (donationAmount) {
      setDonationMessage(`Thank you for your valuable donation of £${donationAmount}!`);
      setDonationAmount(''); 
    } else {
      setDonationMessage('Please enter or select an amount for Donation.');
    }
  };
  return (
    <div className="donation-container">
    <h2>Support Plastic Recycling</h2>
    <p>Your donations help fund plastic recycling initiatives, community clean-ups, and awareness campaigns. Every contribution makes a difference!</p>
    
    <form onSubmit={handleSubmit} className="donation-form">
      <label htmlFor="donation-amount">Enter Donation Amount (£):</label>
      <input
        type="number"
        id="donation-amount"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
        placeholder="e.g., 10, 20"
      />

      <div className="preset-buttons">
        {[5, 10, 20, 50].map((amount) => (
          <button
            type="button"
            key={amount}
            onClick={() => handleDonation(amount)}
            className="preset-button"
          >
            £{amount}
          </button>
        ))}
      </div>

      <button type="submit" className="submit-button">Donate</button>
    </form>

    {donationMessage && <p className="donation-message">{donationMessage}</p>}
  </div>
  );
}

export default Donation