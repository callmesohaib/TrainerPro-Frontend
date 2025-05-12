import React from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Login from './Pages/login'
import Register from './Pages/register'
import Navbar from './Components/navbar'
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

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/workouts/:id" element={<WorkoutDetails />} />
        <Route path="/workouts/edit/:id" element={<CreateWorkout />} />
        <Route path="/workouts" element={<Workout />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/workout-timer/:id" element={<WorkoutTimer />} />
        <Route path="/create-workout" element={<CreateWorkout />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App
