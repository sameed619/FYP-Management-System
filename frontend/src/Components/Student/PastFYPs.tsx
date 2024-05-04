import React, { useState } from "react";
import NavbarMenu from "../Navbar";
import "./PastFYPs.css";
import Table from "react-bootstrap/Table";
import TextField from "@mui/material/TextField";

const PastFYPs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const FYPData = [
    {
      id: 1,
      title: "3C",
      description:
        "3C is a desktop-based application that allows the user to create a 3D character using a single 360 video of person.",
      technologies:
        "Python, Blender, Nvidia, PyTorch, PyQT, HTML, CSS, JS, React, Unreal Engine",
      supervisor: "Ms. Humera Sabir",
      members:
        "Noman Asif (i19-1880), Afaq Qureshi (i19-1775) , Faizan Zubair (i19-1863)",
      posterLink: "https://ibb.co/TBMqyt7",
    },
    {
      id: 2,
      title: "KisaanDost",
      description:
        " KisaanDost is a Mobile-first Web Application/Android Application where farmers can have a phone call-style conversation in which they query our chatbot to gain solutions to their problems.",
      technologies:
        " Python, Html, CSS, Javascript, Flask, Figma, Pytorch, Visual Studio",
      supervisor: "Dr. Mirza Omer Beg",
      members:
        "Syed Muhammad Asad (i19-1778), Danial Nasir (i19-1861), Asfand Ali lrfan (i19-1656)",
      posterLink: "https://ibb.co/yq9FBNr",
    },
    {
      id: 3,
      title: "DEEPFARM",
      description:
        "Deepfarm is a web application that uses open-source satellite imagery (Sentinel 2) to analyze crop fields and provide useful information for decision makers and other stakeholders.",
      technologies:
        " Python, TensorFlow, Flask, HTML, CSS, JS, Google Collab, OpenCV",
      supervisor: "MS. HUMERA SABIR, DR. MIRZA OMER BEG",
      members:
        "KHAWAJA HASSAAN AHMAD (i19-1699), JAWAD AFZAL (i19-1854), MUHAMMAD MOHTAD YOUNUS (i19-1721)",
      posterLink: "https://ibb.co/ydJ2mtD",
    },
    {
      id: 4,
      title: "DressEZ",
      description:
        " A cross-platform mobile app made in Flutter, that utilizes the power of deep learning to recommend clothes to its customers.",
      technologies:
        "Python, PyTorch, Flutter, MongoDB, Firebase, BeautifulSoup, Selenium",
      supervisor: "Dr. Faisal Cheema",
      members:
        "Ali Murtaza (191-1665) , Talha Ali Khan (191-1681) , Saad Jafar (191-1691)",
      posterLink: "https://ibb.co/dmnfVnD",
    },
    {
      id: 5,
      title: "DermAssistant",
      description:
        "This is a RnD project focusing on developing an Al Model for classifying popular skin diseases in Asia.",
      technologies:
        "This is a RnD project focusing on developing an Al Model for classifying popular skin diseases in Asia.",
      supervisor: "Dr. Labiba Fahad",
      members: "Faraz Amjad (i19-1770) , Sajawal Awan (i19-1707)",
      posterLink: "https://ibb.co/jVgkzQX",
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredFYPs = FYPData.filter(
    (fyp) =>
      fyp.title.toLowerCase().includes(searchTerm) ||
      fyp.description.toLowerCase().includes(searchTerm) ||
      fyp.technologies.toLowerCase().includes(searchTerm) ||
      fyp.supervisor.toLowerCase().includes(searchTerm) ||
      fyp.members.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <div className="HomeDiv">
        <div className="navbarFYPs">
          <NavbarMenu />
        </div>

        <div className="titleHome">
          <h1>Past FYPs</h1>
        </div>

        <div className="content">
          <div className="searchBar">
            <TextField
              label="Search FYPs"
              variant="outlined"
              className="searchFYPs"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="Fyps-list">
            <Table responsive="sm">
              <thead id="fypHeadings">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Technologies</th>
                  <th>Supervisor Name</th>
                  <th>Group Members</th>
                  <th>Poster</th>
                </tr>
              </thead>
              <tbody>
                {filteredFYPs.map((fyp) => (
                  <tr key={fyp.id}>
                    <td>{fyp.id}</td>
                    <td>{fyp.title}</td>
                    <td>{fyp.description}</td>
                    <td>{fyp.technologies}</td>
                    <td>{fyp.supervisor}</td>
                    <td>{fyp.members}</td>
                    <td>
                      <a href={fyp.posterLink} target="_blank" rel="noreferrer">
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PastFYPs;
