import React, { useState } from 'react';
import axios from 'axios';
import './ContentDisplay.css';

const ContentDisplay = () => {
  const [content, setContent] = useState(null);
  const [question, setQuestion] = useState('');

  const handleFetchContent = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/content', { question });
      setContent(response.data.result);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  return (
    <div className="container">
      {!content && <div className="empty-state">Ask your Mitr to solve your problem</div>}
      {content && <div className="content-display">{content}</div>}
      <div className="input-container">
        <input 
          type="text" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          placeholder="Enter your question"
        />
        <button onClick={handleFetchContent}>Send</button>
      </div>
    </div>
  );
};

export default ContentDisplay;
