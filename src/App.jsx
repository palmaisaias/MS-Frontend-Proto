import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import VisionBoards from './pages/VisionBoards';
import VisionBoardDetail from './pages/VisionBoardDetail'; // Import the new component
import BirthPreparation from './pages/BirthPreparation';
import BirthPlan from './components/BirthPlan';
import PersonalVisionBoard from './pages/PersonalVisionBoard';
import Sanctuary from './components/Sanctuary';
import SingleBoardDetail from './components/SingleBoardDetail';


function App() {
  return (
    <Router>
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/vision-boards" element={<VisionBoards />} />
        <Route path="/birth-preparation" element={<BirthPreparation />} />
        <Route path="/personal-vision-board" element={<PersonalVisionBoard />} />
        <Route path="/sanctuary" element={<Sanctuary />} />
        <Route path="/vision-board/:boardId" element={<SingleBoardDetail />} />

        {/* New dynamic routes */}
        <Route path="/vision-boards/:id/content" element={<VisionBoardDetail />} />
        <Route path="/birth-preparation/birth-plan/:id" element={<BirthPlan />} />
      </Routes>
    </Router>
  );
}

export default App;

