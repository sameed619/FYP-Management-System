import NavbarMenu from "./Navbar";
import "./Home.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


const Home = ({ _id, email, password, role }) => {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({});

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
          `http://localhost:4000/projDetails/data/${_id}`
        );
        console.log("After Fetch:");
        console.log("Response: ", response.data.details);
        setData(response.data.details);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [_id]);

  const divMem = document.getElementsByClassName("card2");

  // Convert HTMLCollection to an array using Array.from
  const divMemArray = Array.from(divMem);

  // Check if any <p> elements exist in divMemArray
  const hasPTags = divMemArray.some(
    (element) => element.querySelector("p") !== null
  );

  if (!hasPTags) {
    if (data.Members)
      data.Members.forEach((mem) => {
        const ptag = document.createElement("p");
        ptag.textContent = mem;

        // Iterate over the array and append the ptag to each element
        divMemArray.forEach((element) => {
          element.appendChild(ptag.cloneNode(true)); // Use cloneNode to append a copy of ptag
        });
      });
  } else {
    console.log(
      'Skipping writing data. <p> elements already exist in div "card2".'
    );
  }

  return (
    <>
      <NavbarMenu />
      <div className="HomeDiv">
        <div className="titleHome">
          <h1>Dashboard </h1>
        </div>
        <div className="content">
          <div className="titleCard card">
            <h3 id="titleProj">Project Title </h3>
            <p id="titleFYP">{data.fypTitle}</p>
          </div>

          <div className="card">
            <h3 id="GroupTitle">Group Members </h3>
            <div className="card2"></div>
          </div>

          <div className="card">
            <h3 id="SupvsrTitle">Supervisor </h3>
            <p id="supervisorName">{data.Supervisor}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
