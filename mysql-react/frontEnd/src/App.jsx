// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/landingPage";
import SummaryPage from "./components/pages/SummaryPage";
import PlayerPage from "./components/pages/playerPage";
import CoachPage from "./components/pages/CoachPage";
import StadiumPage from "./components/pages/StadiumPage";
import TeamPage from "./components/pages/TeamPage";
import FinancialPage from "./components/pages/FinancialPage";
import ResultsPage from "./components/pages/ResultsPage";
import StatsPage from "./components/pages/StatsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/more_info" element={<SummaryPage />} />
      <Route path="/player" element={<PlayerPage />} />
      <Route path="/coach" element={<CoachPage />} />
      <Route path="/stadium" element={<StadiumPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/finance" element={<FinancialPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  );
};

export default App;
