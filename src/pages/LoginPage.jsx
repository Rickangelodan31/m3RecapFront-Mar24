import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setToken } = useContext(SessionContext);
  const [username, setUsername] = useState(""); // Changed to email to match common login field
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }), // Changed username to email
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.token);
        setToken(responseData.token);
        navigate("/profile"); // Redirect to the home page or dashboard
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          username
          <input
            type="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default LoginPage;
