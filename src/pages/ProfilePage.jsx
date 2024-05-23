import React, { useEffect, useState, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import TechCourseList from "./TechCourseList";

const ProfilePage = () => {
  const { token, setToken } = useContext(SessionContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message);
          if (response.status === 401) {
            // If unauthorized, clear the token and navigate to login page
            setToken(null);
            navigate("/");
          }
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, setToken, navigate]);

  // Fetch courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses`);

        if (response.ok) {
          const courseData = await response.json();
          setCourses(courseData);
        } else {
          const errorData = await response.json();
          console.error("Error fetching courses:", errorData.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelection = (selectedCourseId) => {
    // Handle the course selection logic here
    console.log("Selected course ID:", selectedCourseId);
    // You can perform any additional actions here, such as updating the user's profile with the selected course
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p style={{ color: "red" }}>{errorMessage}</p>;
  }

  return (
    <>
      <h1>Profile Page</h1>
      {user && (
        <div>
          <p>
            <strong>First Name:</strong> {user.firstname}
          </p>
          {/* Display user details */}
          {/* Add a course selection dropdown or list */}
          <label htmlFor="courseSelect">Select a Course:</label>
          <select
            id="courseSelect"
            onChange={(e) => handleCourseSelection(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
          {/* Add a link or button to access the student portal */}
          <button onClick={() => navigate("/student-portal")}>
            Student Portal
          </button>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
