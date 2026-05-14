import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/blog/all")
      .then(res => {
        // Handle both old format (array) and new format (paginated object)
        const blogData = res.data.blogs || res.data;
        setBlogs(Array.isArray(blogData) ? blogData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="home" style={{textAlign: "center", padding: "50px"}}>
          <p>Loading blogs...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="home">
        {blogs.length === 0 ? (
          <div style={{gridColumn: "1 / -1", textAlign: "center", padding: "50px", color: "#999"}}>
            <p>No blogs available yet. Be the first to write one!</p>
          </div>
        ) : (
          blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        )}
      </div>
    </>
  );
}

export default Home;