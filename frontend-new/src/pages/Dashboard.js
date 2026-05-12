import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [data, setData] = useState({ title:"", content:"", author:"" });

  const loadBlogs = () => {
    axios.get("http://localhost:5000/api/blog/all").then(res => setBlogs(res.data));
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const addBlog = async () => {
    await axios.post("http://localhost:5000/api/blog/add", data);
    loadBlogs();
  };

  const deleteBlog = async (id) => {
    await axios.delete(`http://localhost:5000/api/blog/delete/${id}`);
    loadBlogs();
  };

  return (
    <div className="dashboard">
      <input placeholder="Title" onChange={e=>setData({...data,title:e.target.value})}/>
      <textarea placeholder="Content" onChange={e=>setData({...data,content:e.target.value})}></textarea>
      <input placeholder="Author" onChange={e=>setData({...data,author:e.target.value})}/>
      <button onClick={addBlog}>Add Blog</button>

      {blogs.map(blog => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <button onClick={()=>deleteBlog(blog._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
export default Dashboard;
