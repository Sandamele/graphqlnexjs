import React from 'react'
import blogStyle from '../src/styles/Blog.module.css';
export default function Blog({heading, author, blogSlug}) {
  return (
    <div className={blogStyle.container}>
        <div className={blogStyle.card}>
        <h3>{heading}</h3>
        <h5>{author}</h5>
        <a href={`blog/${blogSlug}`}>View Blog</a>
    </div>
    </div>
  )
}
