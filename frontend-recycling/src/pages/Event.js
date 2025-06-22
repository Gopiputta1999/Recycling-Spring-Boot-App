import React, {useState} from 'react'
import '../css/Event.css';
function Event() {
    
    const [submitted, setSubmitted] = useState(false); 
    const handleform = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        setSubmitted(true); 
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!");
        
        
      };
  return (
    <div className="page-container">
        <div className="event-details">
        <h1><center>Awarness on Plastic Recycling</center></h1>
        <p>
          <b>Event Details:</b> Event on Awareness on Plastic Recycling, people
          from various parts of the country 
          will participate in the Event. It is
          going to be held on November 14th at 2:00 P.M in Manchester, which is
          going to be a 2-hour event where we discuss the plan of actions.
          <b> Register below.</b> All are welcome to make the event a grand
          success.
        </p>
        </div>
    <div className="form-container">
    <h2>Register for the Event</h2>
       
    {submitted ? (
          <div className="success-message">
            <p>Successfully submitted! Thank you for registering.</p>
          </div>
        ) : (
          <form onSubmit={handleform} className="event-form">
            <label htmlFor="username"><b>Name</b></label>
            <input type="text" placeholder="Enter your name" name="username" required />

            <label htmlFor="email"><b>Email</b></label>
            <input type="email" placeholder="Enter your email address" name="email" required />

            <label htmlFor="age"><b>Age</b></label>
            <input type="number" placeholder="Enter your age" name="age" required />

            <label htmlFor="gender"><b>Gender:</b></label>
            <select name="gender" id="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="trans">Trans</option>
            </select>

            <button type="submit" className="submit-btn">Register</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Event