import NavbarMenu from "./Navbar";
import "./ProjectSubmission.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";

const ProjectSubmission = ({ _id, email, password, role }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [proposalFile, setProposalFile] = useState("");
  const user = _id;
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  var status = false;

  if (formSubmitted) {
    // Make the POST API call when the form is submitted
    const submitForm = async () => {
      try {
        console.log("Proposal Title: ", title);
        console.log("Proposal description: ", description);
        console.log("Proposal File: ", proposalFile);
        console.log("User Id: ", user);

        const dataToSend = {
          title: title,
          description: description,
          proposalFile: proposalFile,
          user: user,
        };

        console.log("FORM DATA TO SEND: ", dataToSend);

        axios
          .post("http://localhost:4000/submitProposal/submitForm/", dataToSend)
          .then((response) => {
            console.log("Response:", response.data);
            status = response.data;
            // Handle response data
          })
          .catch((error) => {
            console.error("Error:", error);
            // Handle error
          });

        // const response = await axios.post(
        //   `http://localhost:4000/submitProposal/submitForm/${dataToSend}`
        // );

        // console.log(response.data); // Handle response data as needed
        // Show success message or redirect after successful submission
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    submitForm();
  }

  if (formSubmitted) {
    const FormElement = document.getElementsByClassName(
      "card-ProposalSubmission"
    );
    const ArrFormelement = Array.from(FormElement);

    ArrFormelement.forEach((element) => {
      element.remove();
    });

    const pElem = document.createElement("p");

    if (status) {
      pElem.textContent = "Proposal Submitted Successfully!";
      pElem.className = "ProposalSuccessMessage";
    } else {
      pElem.textContent = "Proposal Already Submitted!";
      pElem.className = "ProposalFailedMessage";
    }

    const succDiv = Array.from(
      document.getElementsByClassName("successMessage-ProposalSubmission")
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
  return (
    <>
      <NavbarMenu _id={_id} email={email} role={role} />

      <div className="Div-ProposalSubmission">
        <div className="title-ProposalSubmission">
          <h1>Proposal Submission </h1>
        </div>
        <div className="successMessage-ProposalSubmission content-ProposalSubmission"></div>
        <div className="content-ProposalSubmission">
          <Form className="card-ProposalSubmission" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                id="title-ProposalSubmission"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1 Description-ProposalSubmission"
                rows="3"
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>{" "}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Proposal</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter Title"
                id="ProposalFile-ProposalSubmission"
                onChange={(e) => setProposalFile(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="submit"
                placeholder="Enter Title"
                id="Submit-ProposalSubmission"
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ProjectSubmission;
