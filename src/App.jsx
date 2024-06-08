import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import TaskForm from "./components/TaskForm";
import Login from "./pages/Login";
const App = () => (
  <>
  
  
  <div className="mt-3 app">
    <Navbar />
   
   
    <Routes>
    
      <Route path="/" element={<Home />} />
      <Route path="/labels/:id" element={<TaskDetails />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/sign-in" element={<Login />} />
      
    </Routes>
  </div>
  
  
  </>


);

export default App;
