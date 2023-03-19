import "./App.css";
import React from "react";
import { Route, Routes, Navigate  } from "react-router-dom";
import CoursesPage from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import NotFound from "./pages/NotFound";

function App(props) {
  const fetchToken = async () => {
    const response = await fetch(
      "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions"
    );
    const responseData = await response.json();
    const token = responseData.token;
    localStorage.setItem("token", `${token}`);
  };
  fetchToken();

  return (
    <Routes>
      <Route path="/" element={<CoursesPage />} />
      <Route path="/:id" element={<CoursePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
