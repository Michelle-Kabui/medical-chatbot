import React, { useEffect } from 'react';

const ChatbotLoading: React.FC = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:5000';
  }, []);

  return (
    <div>
      <p>Redirecting to chatbot...</p>
    </div>
  );
};

export default ChatbotLoading;
