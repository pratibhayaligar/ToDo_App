import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState(""); // Initialize with empty string
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      const response = await axios.post("http://localhost:4000/api/login", { // Replace with your API endpoint
        email,
        password,
      });

      if(response.data){
      console.log("Login successful:", response.data);
      alert("Login successfull!");
      // Store token or user data in localStorage (if needed)
      localStorage.setItem("user",JSON.stringify(response.data.user)); // Example

      // Redirect to the desired page after login
      navigate("/tasks"); 
      }else{
        console.error("unexpected response format",response);
        alert("Unexpected error.plz try again");
      }

    } catch (error) {
      // Handle login error
      console.error("Login failed:", error.response.data || error.message);

      // Display error message to the user (e.g., using an alert or state)
      alert(error.response.data.message ||"Login failed plz try again");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit">Login</button>{" "}
      </form>
    </div>
  );
};

export default Login;