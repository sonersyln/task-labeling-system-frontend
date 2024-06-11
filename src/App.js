import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import TaskForm from "./components/TaskForm";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./pages/Auth/AuthContext";
import Register from "./pages/Register/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}> 
      <AuthProvider>
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <div className="container-fluid">
                  <div className="mt-3 app">
                    <div className="container-fluid m-2 p-2 baseContainer">
                      <div className="rows">
                        <Sidebar />
                        <div className="col-8 taskContainer">
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
            }
          />
        </Routes>
      </AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  );
}

export default App;
