import { gql } from "@apollo/client";

const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      data {
        id,
        attributes {
          bookname
        }
      }
    }
  }
`;

const ADD_BOOK = gql`
 mutation createBook($bookname: String!, $author: String!, $version: Int!, $describtion: String, dateReleased:){
    createBook(bookname: $bookname, author: $author, version: $version, describtion: $describtion){

    }
 }
`


export { DELETE_BOOK }
