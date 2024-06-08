import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import TaskForm from '../components/TaskForm'
import { Route, Routes } from 'react-router-dom'
import TaskDetails from './TaskDetails'
import TaskList from '../components/TaskList'

const Home = () => {
  return (
    <div>

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
            
            <p>pageable eklenecek</p>
          </div>
        </div>
      </div>
    </div>




    </div>
  )
}

export default Home