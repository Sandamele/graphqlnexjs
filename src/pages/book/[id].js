import { getBook } from "graphql/query";
import Head from "next/head";
import React from "react";
import { client } from "services/client";

export default function ViewBook({book}) {
  return (
    <>
        <Head>
            <title>{book.bookname}</title>
        </Head>
        <div>
            <table className="table">
                <tbody>
                <tr>
                    <th>Title</th>
                    <td>{book.bookname}</td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>{book.describtion}</td>
                </tr>
                <tr>
                    <th>Author</th>
                    <td>{book.author}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { data } = await client.query({
    query: getBook,
    variables: { id: ctx.query.id },
  });
  return {
    props: {
        book: data.book.data.attributes
    },
  };
};
