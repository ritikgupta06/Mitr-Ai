import React, { useState } from 'react';
import axios from 'axios';
import './ContentDisplay.css';

const ContentDisplay = () => {
  const [content, setContent] = useState(null);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchContent = async () => {
    setLoading(true); 
    try {
      const response = await axios.post('https://mitr-ai-1.onrender.com/api/question', { question });
      setContent(response.data.result);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchContent();
    }
  };

  return (<>
<div className="header-container">
  <h1 className="heading">Mitra Ai</h1>
  <div className="icon"></div>
</div>

    <div className="container">
      {loading ? (
        <div className="loading"></div> // Display loading symbol
      ) : (
        content && <div className="content-display">{content}</div>
      )}
      <div className="input-container">
        <input 
          type="text" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          placeholder="Ask your Mitra to solve your problem"
          onKeyDown={handleKeyPress}
        />
        <button className="btn" onClick={handleFetchContent}>Send</button>
      </div>
    </div>
    </>
  );
};

export default ContentDisplay;
