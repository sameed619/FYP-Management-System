import NavbarMenu from "./Navbar";
import "./Home.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


const Home = () => {
  const location = useLocation();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (location.state?.user) {
      setUserData(location.state.user);
    }
  }, [location.state]);

  console.log("Received User Data:", userData);

  useEffect( () => {

    axios.get("http://localhost:4000/auth/login", userData.role)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

  });


  return (
    <>
      <NavbarMenu />
      <div className="HomeDiv">
        <div className="titleHome">
          <h1>Dashboard </h1>
        </div>
        <div className="content">
          <div className="titleCard card">
            <h3>Project Title </h3>
          </div>

          <div className="card">
            <h3>Group Members </h3>
          </div>

          <div className="card">
            <h3>Supervisor </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
