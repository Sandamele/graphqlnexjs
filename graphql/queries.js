const { gql } = require("@apollo/client");

const GET_ALL_BLOG = gql`
  query {
    blogs {
      data {
        attributes {
          Heading
          Author
          BlogSlug
        }
      }
    }
  }
`;

const GET_BLOG = gql`
  query Blog($slugUrl: String!) {
    blogs(filters: { BlogSlug: { eq: $slugUrl } }) {
      data {
        attributes {
          Heading
          Post
          Author
        }
      }
    }
  }
`;

const ADD_POST = gql`
  mutation createBlog(
    $Heading: String!
    $Author: String!
    $Post: String!
    $BlogSlug: String!
  ) {
    createBlog(
      data: {
        Heading: $Heading
        Author: $Author
        Post: $Post
        BlogSlug: $BlogSlug
      }
    ) {
      data {
        id
        attributes {
          Heading
          Author
          Post
          BlogSlug
        }
      }
    }
  }
`;

export { GET_ALL_BLOG, GET_BLOG, ADD_POST };
