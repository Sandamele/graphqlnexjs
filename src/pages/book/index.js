import { useMutation } from "@apollo/client";
import { DELETE_BOOK } from "graphql/mutation";
import { getAllBooks } from "graphql/query";
import React from "react";
import { client } from "services/client";

export default function Index({ books }) {
  const [deleteBook, { data, loading, error }] = useMutation(DELETE_BOOK);
  const btnDeleteBook = (bookId) => {
    deleteBook({ variables: { id: bookId } })
      .then((res) => {
        alert("Book deleted");
        console.log(res);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <h1>Books</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Author</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.attributes.bookname}</td>
                <td>{book.attributes.author} </td>
                <td>{book.attributes.version}</td>
                <td>
                  <a href={`book/${book.id}`} className="btn btn-info">
                    View
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => btnDeleteBook(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { data } = await client.query({ query: getAllBooks });
  return {
    props: {
      books: data.books.data,
    },
  };
};
