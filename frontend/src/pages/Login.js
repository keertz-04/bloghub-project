import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Login() {
  const [data, setData] = useState({ email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/login", data);
      localStorage.setItem("token", res.data.token);
      alert("Login successful! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Login failed";
      alert("Login Failed: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form">
        <h2>Welcome Back!</h2>
        <p style={{marginBottom: "20px", color: "#666"}}>Sign in to your account</p>
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
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={{marginTop: "20px", textAlign: "center"}}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </>
  );
}
export default Login;