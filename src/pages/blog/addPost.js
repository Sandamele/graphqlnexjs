import { ApolloClient, InMemoryCache, useMutation } from "@apollo/client";
import { ADD_POST } from "graphql/queries";
import React, { useState } from "react";

export default function addPost() {
  const [Heading, setHeading] = useState("");
  const [Author, setAuthor] = useState("");
  const [Post, setPost] = useState("");
  const [BlogSlug, setSlug] = useState("");
  const [createBlog, { data, loading, error }] = useMutation(ADD_POST);
  const handleSubmit = async (e) => {
    e.preventDefault();
    createBlog({
      variables: {
        Heading: Heading,
        Author: Author,
        Post: Post,
        BlogSlug: BlogSlug,
      },
    }).then((data) => {
      alert("Blog Post Added");
      setHeading("");
      setAuthor("");
      setPost("");
      setSlug("");
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Heading: </label>
        <input type="text" onChange={(e) => setHeading(e.target.value)} value={Heading}/>
        <br />
        <label>Author: </label>
        <input type="text" onChange={(e) => setAuthor(e.target.value)} value={Author}/>
        <br />
        <label>Posts: </label>
        <textarea
          rows={5}
          cols={30}
          onChange={(e) => setPost(e.target.value)}
          value={Post}
        >
        </textarea>
        <br />
        <label>Slug: </label>
        <input type="text" onChange={(e) => setSlug(e.target.value)} value={BlogSlug}/>
        <br />
        <br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
