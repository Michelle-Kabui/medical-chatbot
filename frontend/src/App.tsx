import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
