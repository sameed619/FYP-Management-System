import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Login from "./Components/Login";
import StudentHome from "./Components/Student/StudentHome";
import SupervisorHome from "./Components/Supervisor/SupervisorHome";
import ProjectSubmission from "./Components/Student/ProjectSubmission";
import PastFYPs from "./Components/Student/PastFYPs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReportWeekly from "./Components/Student/ReportWeekly";
import DocumentRepository from "./Components/Student/DocumentRepository";
import AddGroup from "./Components/Supervisor/AddGroup";
import GroupsAssigned from "./Components/Supervisor/GroupsAssigned";

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
          <Route path="/StudentHome" element={<StudentHome {...userData} />} />
          <Route
            path="/SupervisorHome"
            element={<SupervisorHome {...userData} />}
          />
          <Route
            path="/proposalSubmission"
            element={<ProjectSubmission {...userData} />}
          />
          <Route path="/pastFYP" element={<PastFYPs {...userData} />} />
          <Route
            path="/submitReport"
            element={<ReportWeekly {...userData} />}
          />
          <Route
            path="/doctRepost"
            element={<DocumentRepository {...userData} />}
          />

          <Route path="/AddGroup" element={<AddGroup {...userData} />} />

          <Route
            path="/assignedGroups"
            element={<GroupsAssigned {...userData} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
