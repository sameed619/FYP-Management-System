import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProjectSubmission from "./Components/Student/ProjectSubmission";
import PastFYPs from "./Components/Student/PastFYPs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReportWeekly from "./Components/Student/ReportWeekly";

function App() {
  const [userData, setUserData] = useState(null);

  const handleUserData = (userData) => {
    console.log("Received user data in App:", userData); // Log the received user data
    setUserData(userData);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login handleUserData={handleUserData} />} />
          <Route path="/home" element={<Home {...userData} />} />
          <Route
            path="/proposalSubmission"
            element={<ProjectSubmission {...userData} />}
          />
          <Route path="/pastFYP" element={<PastFYPs />} />
          <Route
            path="/submitReport"
            element={<ReportWeekly {...userData} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
