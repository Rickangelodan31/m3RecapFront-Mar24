import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<h1>Home page</h1>} />
        {/* auth:
          - Signup

          - Login
        */}
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <h1>Profile</h1>
            </PrivateRoute>
          }
        />
        {/* Route to display all books */}
        {/* Route to display one book */}
        {/* Route to create one book */}
        {/* Route to update one book */}
        <Route path='*' element={<h1>404 page</h1>} />
      </Routes>
    </>
  )
}

export default App
