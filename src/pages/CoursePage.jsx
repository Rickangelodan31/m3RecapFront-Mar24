import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          // Replace this URL with the endpoint to fetch courses from your backend
          `${import.meta.env.VITE_API_URL}/courses`
        );

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setErrorMessage("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Course Page</h1>
      {loading && <p>Loading...</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {/* Link to each course page */}
            <Link to={`/courses/${course._id}`}>{course.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursePage;
