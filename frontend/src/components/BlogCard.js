import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  const defaultImage = "https://via.placeholder.com/400x200?text=" + encodeURIComponent(blog.title || "Blog");
  
  return (
    <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card">
        <img src={defaultImage} alt={blog.title} onError={(e) => { e.target.style.display = "none"; }} />
        <div className="card-content">
          <h3>{blog.title}</h3>
          <p>{blog.content.substring(0, 120)}...</p>
          <div className="card-meta">
            <span>{blog.author || "Unknown Author"}</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;