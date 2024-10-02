import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import VisionBoards from "./pages/VisionBoards";
import VisionBoardDetail from "./pages/VisionBoardDetail";
import PersonalVisionBoard from "./pages/PersonalVisionBoard";
import Sanctuary from "./components/Sanctuary";
import SingleBoardDetail from "./components/SingleBoardDetail";
import OAuthCallback from "./components/OAuthCallBack";

function App() {
  return (
    <Router>
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/vision-boards" element={<VisionBoards />} />
        <Route path="/personal-vision-board" element={<PersonalVisionBoard />} />
        <Route path="/sanctuary" element={<Sanctuary />} />
        <Route path="/vision-board/:boardId" element={<SingleBoardDetail />} />
        <Route path="/vision-boards/:id/content" element={<VisionBoardDetail />} />

        {/* OAuth Callback Route...still working on implementing this. Need more research */}
        <Route path="/auth/callback" element={<OAuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
