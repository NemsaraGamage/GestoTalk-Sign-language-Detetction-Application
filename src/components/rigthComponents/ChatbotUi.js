import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = (props) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [predictions, setPredictions] = useState([]);

  // update predictions when props.prediction changes
  useEffect(() => {
    if (props.prediction) {
      setPredictions(prevPredictions => [...prevPredictions, props.prediction]);
    }
  }, [props.prediction]);

  // useEffect to update input when predictions change
  useEffect(() => {
    setInput(predictions.join('').toLowerCase());
  }, [predictions]);

  // Function to communicate with Dialogflow backend
  const chatWithDialogflow = async (userInput) => {
    try {
      const response = await axios.post('http://localhost:3002/chatbot', { queryResult: { queryText: userInput } });
      return response.data.fulfillmentText;
    } catch (error) {
      console.error('Error communicating with Dialogflow:', error);
      return 'Sorry, an error occurred.';
    }
  };

  // Function to handle the conversation between the user and the chatbot
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user's message to messages state
    const userMessage = { text: input, user: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Add placeholder message for dialogflow response
    const aiMessage = { text: '...', user: false };
    setMessages(prevMessages => [...prevMessages, aiMessage]);

    // Communicate with Dialogflow and get response
    const response = await chatWithDialogflow(input);

    // Add Dialogflow response to messages state
    const newAiMessage = { text: response, user: false };
    setMessages(prevMessages => [...prevMessages.slice(0, -1), newAiMessage]);

    // Reset inputs and predictions from the list once sent
    setInput('');
    setPredictions([]);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user ? 'user-message' : 'dialogflow-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className="chatbot-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start your conversation..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
