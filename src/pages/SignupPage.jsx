import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [telephoneNumber, setTelephonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [program, setProgram] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [usertype, setUsertype] = useState("student"); // Default to student
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/${usertype}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            middlename,
            lastname,
            username,
            email,
            telephoneNumber,
            password,
            program,
            dateOfBirth,
          }),
        }
      );

      if (response.status === 201) {
        const newUser = await response.json();
        console.log(newUser);
        navigate("/login");
      } else if (response.status === 400 || response.status === 401) {
        const error = await response.json();
        console.log(error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <h1>Signup</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Firstname
          <input
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
        </label>
        <label>
          Middlename
          <input
            value={middlename}
            onChange={(event) => setMiddlename(event.target.value)}
          />
        </label>
        <label>
          Lastname
          <input
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </label>
        <label>
          username
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Telephone Number
          <input
            value={telephoneNumber}
            onChange={(event) => setTelephonenumber(event.target.value)}
          />
        </label>
        <label>
          Date of Birth
          <input
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
        </label>
        <label>
          Program
          <input
            value={program}
            onChange={(event) => setProgram(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label>
          User Type
          <select
            value={usertype}
            onChange={(e) => setUsertype(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignupPage;
