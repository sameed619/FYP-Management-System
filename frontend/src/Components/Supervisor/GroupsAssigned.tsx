import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarMenu from "./Navbar";
import "./GroupsAssigned.css";

const GroupsAssigned = ({ _id, email, password, role }) => {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Email:", email);

        console.log("Before Fetch: ");
        const response = await axios.get(
          `http://localhost:4000/assignedProjects/data/${email}`
        );
        console.log("After Fetch:");
        console.log("Response after Fetch: ", response.data);

        setProjects(response.data); // Assuming the projects array is directly received in response.data

        console.log("State Data: ", projects);
        //console.log("Projects Length: ", projects.projects.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email]);

  return (
    <>
      <NavbarMenu />

      <div className="HomeDiv">
        <div className="titleHome">
          <h1>Assigned Groups</h1>
        </div>
        <div className="content">
          {/* {projects.projects.length < 0 ? (
            projects.map((project) => (
              <div className="card" key={project.projects._id}>
                <p>
                  <b>Project Title:</b> {project.fypTitle}
                </p>
                <p>
                  <b>Supervisor:</b> {project.Supervisor}
                </p>
                <p>
                  <b>Group Members:</b> {project.Members.join(", ")}
                </p>
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )} */}
        </div>
      </div>
    </>
  );
};

export default GroupsAssigned;
