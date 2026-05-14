import { useState } from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({ email:"", password:"" });

  const submit = async () => {
    const res = await axios.post("/api/admin/login", data);
    localStorage.setItem("token", res.data.token);
    window.location = "/dashboard";
  };

  return (
    <div className="form">
      <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={e=>setData({...data,password:e.target.value})}/>
      <button onClick={submit}>Login</button>
    </div>
  );
}
export default Login;
