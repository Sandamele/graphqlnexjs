import { useMutation } from "@apollo/client";
import { ADD_STUDENT, UPDATE_STUDENT } from "graphql/studentQueries";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function StudentModal({
  buttonValue,
  updateForm,
  studentId = null,
  updateFormValues,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [studentInput, setStudentInput] = useState({
    firstname: updateForm ? updateFormValues.firstname : "",
    lastname: updateForm ? updateFormValues.lastname : "",
    course: updateForm ? updateFormValues.course : "",
  });
  const [createStudents, { data, loading, error }] = updateForm ? useMutation(UPDATE_STUDENT) : useMutation(ADD_STUDENT);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStudentInput((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e) => {
    let student_id = Math.floor(Math.random() * 100000).toString();
    e.preventDefault();
    if (updateForm) {
        createStudents({variables: {
            id: studentId,
            firstname: studentInput.firstname,
            lastname: studentInput.lastname,
            course: studentInput.course,
        }}).then((data) => {
            alert("Student Info Updated");
            window.open("/students", "_self");
          });
    } else {
      createStudents({
        variables: {
          firstname: studentInput.firstname,
          lastname: studentInput.lastname,
          course: studentInput.course,
          student_id: student_id,
        },
      }).then((data) => {
        alert("Student Added");
        window.open("/students", "_self");
      });
    }
  };
  return (
    <div>
      <button
        className="btn btn-danger"
        style={{ borderRadius: "50px" }}
        onClick={handleShow}
      >
        {buttonValue}
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{updateForm ? "Update Student" : "Add Student"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Firstname: </label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                onChange={handleChange}
                value={studentInput.firstname}
              />
            </div>
            <div className="form-group">
              <label>Lastname: </label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                onChange={handleChange}
                value={studentInput.lastname}
              />
            </div>
            <div className="form-group">
              <label>Course: </label>
              <input
                type="text"
                className="form-control"
                name="course"
                onChange={handleChange}
                value={studentInput.course}
              />
            </div>
            <input type="submit" className="btn btn-secondary"  value={updateForm? "Update":"Submit"}/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
