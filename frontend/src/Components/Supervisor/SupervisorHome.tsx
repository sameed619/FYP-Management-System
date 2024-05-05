import NavbarMenu from "./Navbar";
import "./Home.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SupervisorHome = ({ _id, email, password, role }) => {
  const [supervisorName, setSupervisorName] = useState("");
  const [noOfProj, setNoOfProjs] = useState();

  console.log("id in Home: ", _id);
  console.log("email in Home: ", email);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!_id) {
          console.error("User ID is not available.");
          return;
        }

        console.log("Id:", _id);

        console.log("Before Fetch: ");
        const response = await axios.get(
          `http://localhost:4000/SupervisorHome/data/${email}`
        );
        console.log("After Fetch:");
        console.log("Response: ", response.data.dataToSend);
        console.log(
          " ------ TP: ",
          response.data.dataToSend.projectCount[0].totalProjects
        );
        setSupervisorName(response.data.dataToSend.SupervisorName);
        setNoOfProjs(response.data.dataToSend.projectCount[0].totalProjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [_id]);

  return (
    <>
      <NavbarMenu />
      <div className="HomeDiv">
        <div className="titleHome">
          <h1>Dashboard </h1>
        </div>
        <div className="content">
          <div className="SupverisorNameCard card">
            <h5>Welcome, </h5>
            <h2>{supervisorName}</h2>
          </div>
          <div className="titleCard card">
            <h3 id="titleProj">No. of Groups </h3>
            <p id="titleFYP">{noOfProj}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupervisorHome;
