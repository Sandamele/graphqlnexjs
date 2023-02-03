const { gql } = require("@apollo/client");

const GET_ALL_STUDENT = gql`
  query Students {
    students {
      data {
        id
        attributes {
          firstName
          lastName
          course,
          student_id
        }
      }
    }
  }
`;

const ADD_STUDENT = gql`mutation createStudent($firstname: String!, $lastname: String!, $course: String!, $student_id: String!){
    createStudent(data :{firstName: $firstname, lastName: $lastname , course: $course ,student_id: $student_id}){
     data{
      id,
      attributes{
        firstName,
        lastName,
        course,
        student_id
      }
     }
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation updateStudent($firstname: String!, $lastname: String!, $course: String!, $id: ID!){
    updateStudent(id: $id, data: {firstName: $firstname, lastName: $lastname , course: $course }){
      data{
        id,
        attributes{
          firstName,
          lastName,
          course
        }
      }
    }
  }
`
const DELETE_STUDENT = gql`
  mutation deleteStudent($id: ID!){
    deleteStudent(id: $id){
      data {
        id,
        attributes{
          firstName
        }
      }
    }
  }
`
export { GET_ALL_STUDENT, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT };
