import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blog/${id}`)
      .then(res => setBlog(res.data));
  }, [id]);

  return (
    <div className="view">
      <h1>{blog.title}</h1>
      <h4>By {blog.author}</h4>
      <p>{blog.content}</p>
    </div>
  );
}

export default BlogView;
