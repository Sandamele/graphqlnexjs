import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { GET_ALL_BLOG, GET_BLOG } from "graphql/queries";
import React from "react";

export default function BlogPost({ blog }) {
  return (
    <div>
      <h1>{blog.Heading}</h1>
      <p>
        <strong>Author: {blog.Author}</strong>
      </p>
      <p>{blog.Post}</p>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
  });

  const slugUrl = ctx.query.id.toString();

  const { data } = await client.query({
    query: GET_BLOG,
    variables: { slugUrl: slugUrl },
  });
  return {
    props: {
      blog: data.blogs.data[0].attributes,
    },
  };
};
