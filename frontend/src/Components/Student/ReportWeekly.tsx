import NavbarMenu from "./Navbar";
import "./ReportSubmission.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";

const ReportWeekly = ({ _id, email, password, role }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reportFile, setreportFile] = useState("");
  const [status_Check, setStatus] = useState("");
  const [form_Submitted, setFormStatus] = useState("");

  const user = _id;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("------- IN HANDLE SUBMIT FUNCTION ------------");

    setFormStatus(true);

    try {
      console.log("Report Title: ", title);
      console.log("Report description: ", description);
      console.log("Report File: ", reportFile);
      console.log("User Id: ", user);

      const dataToSend = {
        title: title,
        description: description,
        reportFile: reportFile,
        user: user,
      };

      console.log("FORM DATA TO SEND: ", dataToSend);

      axios
        .post("http://localhost:4000/submitReport/submitForm/", dataToSend)
        .then((response) => {
          setStatus(response.data.status_Check);

          console.log("Status: ", status_Check);

          // Handle response data
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error
        });

      ////////////////////
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    if (form_Submitted) {
      const FormElement = document.getElementsByClassName(
        "card-ReportSubmission"
      );
      const ArrFormelement = Array.from(FormElement);

      ArrFormelement.forEach((element) => {
        element.remove();
      });

      console.log("Status 2: ", status_Check);

      const pElem = document.createElement("p");

      if (status_Check === true) {
        pElem.textContent = "Report Submitted Successfully!";
        pElem.className = "ReportSuccessMessage";
      } else {
        pElem.textContent = "Report for this week Already Submitted!";
        pElem.className = "ReportFailedMessage";
      }

      const succDiv = Array.from(
        document.getElementsByClassName("successMessage-ReportSubmission")
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
      <NavbarMenu _id={_id} email={email} role={role} />

      <div className="Div-ReportSubmission">
        <div className="title-ReportSubmission">
          <h1>Weekly Report Submission </h1>
        </div>
        <div className="successMessage-ReportSubmission content-ReportSubmission"></div>
        <div className="content-ReportSubmission">
          <Form className="card-ReportSubmission" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                id="title-ReportSubmission"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1 Description-ReportSubmission"
                rows="3"
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>{" "}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Report</Form.Label>
              <Form.Control
                type="file"
                placeholder="Enter Title"
                id="reportFile-ReportSubmission"
                onChange={(e) => setreportFile(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="submit"
                placeholder="Enter Title"
                id="Submit-ReportSubmission"
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ReportWeekly;
