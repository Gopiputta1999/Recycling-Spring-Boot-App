import React, { useState } from 'react';
import '../css/Chatbot.css';
import chatbotLogo from '../asserts/chatbot.jpg';

const Chatbot = () => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setChatbotOpen(!isChatbotOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);
      setInput('');
    }
  };

  return (
    <div>
      <div className="chatbot-logo" onClick={toggleChatbot}>
        <img src={chatbotLogo} alt="Chatbot Logo" />
      </div>
      {isChatbotOpen && (
        <div className="chatbot-container">
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
          <button className="close-button" onClick={toggleChatbot}>X</button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
