import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Register() {
  const [data, setData] = useState({ name:"", email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!data.name || !data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/admin/register", data);
      alert("Registered Successfully! Please login now.");
      setData({ name:"", email:"", password:"" });
      navigate("/login");
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Registration failed";
      alert("Registration Failed: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form">
        <h2>Create Your Account</h2>
        <p style={{marginBottom: "20px", color: "#666"}}>Join our community of writers and readers</p>
        <input 
          placeholder="Full Name" 
          value={data.name}
          onChange={e=>setData({...data,name:e.target.value})}
        />
        <input 
          placeholder="Email Address" 
          type="email"
          value={data.email}
          onChange={e=>setData({...data,email:e.target.value})}
        />
        <input 
          placeholder="Password" 
          type="password"
          value={data.password}
          onChange={e=>setData({...data,password:e.target.value})}
        />
        <button onClick={submit} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p style={{marginTop: "20px", textAlign: "center"}}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </>
  );
}
export default Register;