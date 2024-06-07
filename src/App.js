import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
const App = () => (
  <div className="container mt-3 app">
    <div className="container m-2 p-2">
      <div className="row text-center">
        <div className="col-12">
          <h2>Anasayfa</h2>
        </div>
      </div>
      <div className="row">
        <Navbar />
        <div className="col-8 p-2">
          Tasks mapler buraya
          <div className="card p-2 text-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/labels/:id" element={<TaskDetails />} />
              <Route path="/tasks" element={<TaskList />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
