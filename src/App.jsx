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
import SmartWorkout from './Pages/smartWorkout';
import PageNotFound from './Pages/pageNotFound';
import Careers from './Pages/career';
import DemoPage from './Pages/demo';
import FAQPage from './Pages/faq';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    document.documentElement.focus();
  }, [pathname]);

  return null;
};

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
      <ScrollToTop />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/smart-workouts" element={
            <ProtectedRoute>
              <SmartWorkout />
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
          <Route path="/careers" element={
            <ProtectedRoute>
              <Careers />
            </ProtectedRoute>
          } />
          <Route path="/demo" element={
            <ProtectedRoute>
              <DemoPage />
            </ProtectedRoute>
          } />
          <Route path="/faq" element={
            <ProtectedRoute>
              <FAQPage />
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


          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;