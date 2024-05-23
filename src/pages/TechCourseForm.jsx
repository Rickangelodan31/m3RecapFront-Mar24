import React, { useState } from "react";

const TechCourseForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [modules, setModules] = useState([]);
  const [diploma, setDiploma] = useState({ name: "", qualification: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/TechCourse/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          duration,
          modules,
          diploma,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create course");
      }
      const data = await response.json();
      console.log("Course created:", data);
      // Optionally, redirect to another page after successful submission
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div>
      <h2>Add New Tech Course</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Duration:</label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        {/* Add fields for modules and diploma */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TechCourseForm;
