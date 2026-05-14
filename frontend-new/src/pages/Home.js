import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/api/blog/all")
      .then(res => setBlogs(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="home">
        {blogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </>
  );
}

export default Home;
