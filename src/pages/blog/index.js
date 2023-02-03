import { ApolloClient, InMemoryCache } from "@apollo/client";
import Blog from "components/Blog";
import { GET_ALL_BLOG } from "graphql/queries";
import useRouter  from "next/router";
import React from "react";

export default function Index({ blogs }){
    const router = useRouter;
    const addPost = () => {
        router.push('/blog/addPost');
    }
  return (
    <div className="">
      <h1>
        <center>Tech Tree House Blog</center>
      </h1>
      {blogs.map((blog, index) => (
        <Blog
          heading={blog.attributes.Heading}
          author={blog.attributes.Author}
          key={index}
          blogSlug={blog.attributes.BlogSlug}
        />
      ))}
      <center><button onClick={addPost}>Add Post</button></center>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({ query: GET_ALL_BLOG });
  return {
    props: {
      blogs: data.blogs.data,
    },
  };
};
