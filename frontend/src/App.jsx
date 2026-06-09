import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* The Layout component wraps every route inside this block */}
        <Route path="/" element={<Layout />}>
          {/* Index means this loads at the exact root path ("/") */}
          <Route index element={<Dashboard />} />

          {/* This loads at "/profile" */}
          <Route path="profile" element={<UserProfile />} />

          {/* You will add your mock interview page here later */}
          {/* <Route path="interview" element={<MockInterview />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
