import React from 'react';
import {Route, Routes} from 'react-router-dom';
import LandingPage from './LandingPage';
import ChatBot from './ChatBot';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/chatbot" element={<ChatBot/>}/>
        </Routes>
    );
};

export default App;
