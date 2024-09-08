import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import VisionBoards from './pages/VisionBoards';
import BirthPreparation from './pages/BirthPreparation';
// import AboutUs from './pages/AboutUs';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/vision-boards" element={<VisionBoards />} />
        <Route path="/birth-preparation" element={<BirthPreparation />} />
        {/* <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
