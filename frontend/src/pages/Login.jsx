import { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();

    setLoading(true);

    try{

      const res = await axios.post("http://localhost:5000/api/auth/login",{
        email,password
      });

      localStorage.setItem("token",res.data.token);

      alert("Login Successful");
      navigate("/");

    }
    catch(err){
      alert("Login Failed");
    }
    finally{
      setLoading(false);
    }
  }

  return(
    <div className="container">
      <div className="card form-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <input 
            type="email" 
            placeholder="Email" 
            required 
            disabled={loading}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="Password" 
            required 
            disabled={loading}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  )
}