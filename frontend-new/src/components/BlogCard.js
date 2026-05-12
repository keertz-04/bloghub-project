import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="card">
      <h2>{blog.title}</h2>
      <p>{blog.content.substring(0, 100)}...</p>
      <Link to={`/blog/${blog._id}`}>Read More</Link>
    </div>
  );
}

export default BlogCard;
