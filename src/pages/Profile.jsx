import React, { useEffect, useState, useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { token, setToken } = useContext(SessionContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
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
            navigate('/login');
          }
        }
      } catch (error) {
        console.log(error);
        setErrorMessage('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, setToken, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p style={{ color: 'red' }}>{errorMessage}</p>;
  }

  return (
    <>
      <h1>Profile Page</h1>
      {user && (
        <div>
          <p><strong>First Name:</strong> {user.firstname}</p>
          <p><strong>Middle Name:</strong> {user.middlename}</p>
          <p><strong>Last Name:</strong> {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Telephone Number:</strong> {user.telephoneNumber}</p>
          <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
          <p><strong>Program:</strong> {user.program}</p>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
