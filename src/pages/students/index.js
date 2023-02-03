import { ApolloClient, InMemoryCache, useMutation } from "@apollo/client";
import StudentModal from "components/StudentModal";
import { DELETE_STUDENT, GET_ALL_STUDENT } from "graphql/studentQueries";
import { useState } from "react";

export default function Index({ students }) {
    const [deleteStudent, {data, loading, error}] = useMutation(DELETE_STUDENT);
    console.log(students)
    const handleDelete = (id) => {
        deleteStudent({
            variables: {
                id: id
            }
        }).then(data => {alert("Student Deleted"); window.open('/students','_self')})
    }
  return (
    <div className="container">
      <br />
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Course</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.attributes.student_id}>
                <td>{student.attributes.firstName}</td>
                <td>{student.attributes.lastName}</td>
                <td>{student.attributes.course}</td>
                <td>
                  <StudentModal
                    buttonValue={"Update"}
                    updateForm={true}
                    studentId={student.id}
                    updateFormValues={{
                      firstname: student.attributes.firstName,
                      lastname: student.attributes.lastName,
                      course: student.attributes.course,
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <StudentModal buttonValue={"+"} updateForm={false} />
    </div>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({ query: GET_ALL_STUDENT });
  return {
    props: {
      students: data.students.data,
    },
  };
};
