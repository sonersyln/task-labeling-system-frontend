import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import TaskForm from "./components/TaskForm";
import Login from "./pages/Login/Login";
function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/sign-in";
  return (
    <>
      {isLoginRoute ? (
        <Routes>
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      ) : (
        <>
        <Navbar />
        <div className="container-fluid">
          <div className="mt-3 app">
            
            <div className="container-fluid m-2 p-2 baseContainer">
              <div className="rows">
                <Sidebar />

                <div className="col-8  taskContainer">
                  <div className="row titleContainer">
                    <div className="col-8">
                      <h3>Görevler</h3>
                    </div>
                    <div className="col-4">
                      <TaskForm />
                    </div>
                  </div>
                  <div className="card p-2 text-center cardContainer">
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
        </div>
        </>
      )}
    </>
  );
}

export default App;
