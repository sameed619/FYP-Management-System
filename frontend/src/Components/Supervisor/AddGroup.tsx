import NavbarMenu from "./Navbar";
import "./AddGroup.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";

const AddGroup = ({ _id, email, password, role }) => {
  const [Title, setTitle] = useState("");
  const [GroupMembers, setGroupMembers] = useState("");
  const [GroupEmail, setGroupEmail] = useState("");
  const [GroupPassword, setGroupPassword] = useState("");
  const [form_Submitted, setFormStatus] = useState("");

  const [status_Check, setStatus] = useState("");

  const user = _id;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("------- IN HANDLE SUBMIT FUNCTION ------------");

    setFormStatus(true);

    try {
      console.log("Title: ", Title);
      console.log("Members: ", GroupMembers);
      console.log("Email: ", GroupEmail);
      console.log("Password: ", GroupPassword);

      const dataToSend = {
        title: Title,
        GroupMembers: GroupMembers,
        GroupEmail: GroupEmail,
        GroupPassword: GroupPassword,
        SupervisorEmail: email,
      };

      console.log("FORM DATA TO SEND: ", dataToSend);

      axios
        .post("http://localhost:4000/addGroup/addGroupDB/", dataToSend)
        .then((response) => {
          console.log("Status Received: ", response.data.checkStatus);

          setStatus(response.data.checkStatus);

          console.log("Status: ", status_Check);

          // Handle response data
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error
        });

      ////////////////////
    } catch (error) {
      console.error("Error Adding Group:", error);
    }

    if (form_Submitted) {
      const FormElement = document.getElementsByClassName("card-GroupAdd");
      const ArrFormelement = Array.from(FormElement);

      ArrFormelement.forEach((element) => {
        element.remove();
      });

      console.log("Status 2: ", status_Check);

      const pElem = document.createElement("p");

      if (status_Check == true) {
        pElem.textContent = "Group Added Successfully!";
        pElem.className = "GroupSuccessMessage";
      } else {
        pElem.textContent = "Failed! This Group alreay exists.";
        pElem.className = "GroupFailedMessage";
      }

      const succDiv = Array.from(
        document.getElementsByClassName("successMessage-GroupAdd")
      );

      const hasPTags = succDiv.some(
        (element) => element.querySelector("p") !== null
      );

      if (!hasPTags) {
        succDiv.forEach((element) => {
          element.append(pElem);
        });
      }
    }
  };

  return (
    <>
      <NavbarMenu />

      <div className="Div-GroupAdd">
        <div className="title-GroupAdd">
          <h1>Add Groups </h1>
        </div>
        <div className="successMessage-GroupAdd content-GroupAdd"></div>
        <div className="content-GroupAdd">
          <Form className="card-GroupAdd" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                id="title-GroupAdd"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Group Members</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Group Member (Separated by Comma)"
                id="Members-GroupAdd"
                onChange={(e) => setGroupMembers(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Group Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email for Group"
                id="email-GroupAdd"
                onChange={(e) => setGroupEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email for Group"
                id="email-GroupAdd"
                onChange={(e) => setGroupPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="submit" id="Submit-GroupAdd" />
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddGroup;
