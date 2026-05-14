import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/blog/${id}`)
      .then(res => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="view" style={{textAlign: "center", padding: "50px"}}>
          <p>Loading blog post...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="view">
        <Link to="/" style={{color: "#667eea", textDecoration: "none", marginBottom: "20px", display: "inline-block"}}>
          ← Back to Home
        </Link>
        <h1>{blog.title || "Blog Post"}</h1>
        <div className="view-meta">
          <span>By <strong>{blog.author || "Unknown Author"}</strong></span>
          <span> • {new Date(blog.createdAt).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})}</span>
        </div>
        <div className="view-content">
          {blog.content || "No content available"}
        </div>
      </div>
    </>
  );
}

export default BlogView;