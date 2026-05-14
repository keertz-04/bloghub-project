import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [data, setData] = useState({ title:"", content:"", author:"" });
  const [loading, setLoading] = useState(false);

  const loadBlogs = () => {
    axios.get("/api/blog/all")
      .then(res => {
        // Handle both old format (array) and new format (paginated object)
        const blogData = res.data.blogs || res.data;
        setBlogs(Array.isArray(blogData) ? blogData : []);
      })
      .catch(error => {
        console.error("Error loading blogs:", error);
        setBlogs([]);
      });
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const addBlog = async () => {
    if (!data.title || !data.content || !data.author) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/blog/add", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData({ title:"", content:"", author:"" });
      loadBlogs();
      alert("Blog added successfully!");
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Failed to add blog";
      alert("Failed to add blog: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/blog/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        loadBlogs();
        alert("Blog deleted successfully!");
      } catch (error) {
        const errorMsg = error.response?.data?.error || error.message || "Failed to delete blog";
        alert("Failed to delete blog: " + errorMsg);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h2>My Dashboard</h2>
        <p style={{color: "#666", marginBottom: "25px"}}>Create and manage your blog posts</p>
        
        <div style={{background: "#f8f9ff", padding: "25px", borderRadius: "10px", marginBottom: "30px"}}>
          <h3 style={{color: "#667eea", marginBottom: "20px"}}>Create New Blog</h3>
          <input 
            placeholder="Blog Title" 
            value={data.title}
            onChange={e=>setData({...data,title:e.target.value})}
          />
          <textarea 
            placeholder="Blog Content" 
            value={data.content}
            onChange={e=>setData({...data,content:e.target.value})}
          ></textarea>
          <input 
            placeholder="Author Name" 
            value={data.author}
            onChange={e=>setData({...data,author:e.target.value})}
          />
          <button onClick={addBlog} disabled={loading}>
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </div>

        <h3 style={{color: "#667eea", marginBottom: "20px"}}>Your Published Blogs ({blogs.length})</h3>
        
        {blogs.length === 0 ? (
          <p style={{textAlign: "center", color: "#999", padding: "30px"}}>No blogs published yet. Create your first blog above!</p>
        ) : (
          blogs.map(blog => (
            <div key={blog._id} className="blog-item">
              <h4>{blog.title}</h4>
              <p style={{color: "#666", fontSize: "14px", margin: "10px 0"}}>
                By <strong>{blog.author}</strong> • {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p style={{color: "#777", fontSize: "14px", lineHeight: "1.5"}}>
                {blog.content.substring(0, 150)}...
              </p>
              <div className="blog-item-actions">
                <button onClick={()=>deleteBlog(blog._id)} style={{background: "#ff6b6b"}}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
export default Dashboard;