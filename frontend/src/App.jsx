import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import NewAnalysis from "./pages/NewAnalysis";
import UserProfile from "./pages/UserProfile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Dashboard Home */}
          <Route index element={<Overview />} />

          {/* The new dedicated Analysis route */}
          <Route path="analyze" element={<NewAnalysis />} />

          {/* Profile Route */}
          <Route path="profile" element={<UserProfile />} />

          {/* Placeholders for your future modules */}
          {/* <Route path="roadmap" element={<ActiveRoadmap />} /> */}
          {/* <Route path="interview" element={<MockInterview />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
