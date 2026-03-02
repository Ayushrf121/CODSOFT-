import { useState } from "react";
import axios from "axios";
import "./Auth.css";

export default function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSubmit = async(e)=>{
    e.preventDefault();

    setLoading(true);

    try{
      await axios.post("http://localhost:5000/api/auth/register",{
        name,email,password
      });
      alert("Registered Successfully");
    }
    catch(err){
      alert("Registration Failed");
    }
    finally{
      setLoading(false);
    }
  }

  return(
    <div className="container">
      <div className="card form-box">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          <input 
            type="text" 
            placeholder="Name" 
            required 
            disabled={loading}
            onChange={(e)=>setName(e.target.value)}
          />

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
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

      </div>
    </div>
  )
}