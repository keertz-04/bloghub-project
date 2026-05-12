import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav">
      <h1>BLOGHUB</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Admin</Link>
      </div>
    </div>
  );
}

export default Navbar;
