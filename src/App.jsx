import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Login from './Pages/login';
import Register from './Pages/register';
import Navbar from './Components/navbar';
import Home from './Pages/home';
import Footer from './Components/footer';
import Contact from './Pages/contact';
import Profile from './Pages/profile';
import Schedule from './Pages/schedule';
import CreateWorkout from './Pages/createWorkout';
import Workout from './Pages/workout';
import Dashboard from './Pages/dashboard';
import Progress from './Pages/progress';
import WorkoutDetails from './Pages/workoutDetail';
import WorkoutTimer from './Pages/workoutTimer';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: adds smooth scrolling
    });
    
    // Optional: Reset focus to the top of the document for accessibility
    document.documentElement.focus();
  }, [pathname]);

  return null;
};

// Protected route wrapper (example - adjust as needed)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    window.location.href = '/login';
    return null;
  }

  return children;
};

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <ScrollToTop /> {/* Add the scroll to top component */}
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/schedule" element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          } />
          
          <Route path="/workouts/:id" element={
            <ProtectedRoute>
              <WorkoutDetails />
            </ProtectedRoute>
          } />
          
          <Route path="/workouts/edit/:id" element={
            <ProtectedRoute>
              <CreateWorkout />
            </ProtectedRoute>
          } />
          
          <Route path="/workouts" element={
            <ProtectedRoute>
              <Workout />
            </ProtectedRoute>
          } />
          
          <Route path="/progress" element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          } />
          
          <Route path="/workout-timer/:id" element={
            <ProtectedRoute>
              <WorkoutTimer />
            </ProtectedRoute>
          } />
          
          <Route path="/create-workout" element={
            <ProtectedRoute>
              <CreateWorkout />
            </ProtectedRoute>
          } />
          
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;