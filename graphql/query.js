const { gql } = require("@apollo/client");

const getAllBooks = gql`
  query books {
    books {
      data {
        id
        attributes {
          bookname
          author
          version
        }
      }
    }
  }
`;

const getBook = gql`
  query Books($id: ID!) {
    book(id: $id) {
      data {
        attributes {
          bookname
          author
          version
          describtion
        }
      }
    }
  }
`;

export { getAllBooks, getBook };
