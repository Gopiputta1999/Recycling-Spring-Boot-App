import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import '../css/Feedback.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DATABASE_NAME = 'FeedbackDB';
const STORE_NAME = 'feedbackStore';

function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: ''
  });
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Open the database and load feedback when the component mounts
    const loadFeedback = async () => {
      const db = await openDB(DATABASE_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
          }
        }
      });

      const allFeedback = await db.getAll(STORE_NAME);
      setFeedbackList(allFeedback);
    };

    loadFeedback();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFeedback = {
      name: formData.name,
      description: formData.description,
      rating: parseInt(formData.rating, 10)
    };

    const db = await openDB(DATABASE_NAME, 1);
    await db.add(STORE_NAME, newFeedback);

    setFeedbackList([...feedbackList, newFeedback]);
    setFormData({ name: '', description: '', rating: '' });
  };

  return (
    <div>
      <Header/>  
      <div className="feedback-page">
        <h2>Product Feedback</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </label>

          <label>
            Rating:
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Rating</option>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Very Poor</option>
            </select>
          </label>

          <button type="submit">Submit Feedback</button>
        </form>

        <h3>Feedback Received</h3>
        <div className="feedback-list">
          {feedbackList.length === 0 ? (
            <p>No feedback yet.</p>
          ) : (
            feedbackList.map((feedback, index) => (
              <div key={index} className="feedback-item">
                <h4>{feedback.name}</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < feedback.rating ? 'filled' : ''}`}
                    >&#9733;</span>
                  ))}
                </div>
                <p>{feedback.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Feedback;
