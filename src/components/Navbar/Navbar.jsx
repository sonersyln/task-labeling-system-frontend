import React, {useEffect, useState} from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { getLabels } from '../../services/api'
import LabelForm from '../LabelForm'
import { IoTrashOutline } from "react-icons/io5";
const Navbar = () => {

    const [Labels, setLabels] = useState([]);

    useEffect(() => {
      const fetchLabels = async () => {
        try {
          const getData = await getLabels();
          setLabels(getData.data.data);
          console.log(getData.data.data)
        } catch (error) {
          console.error('Error fetching labels:', error);
        }
      };
  
      fetchLabels();
    }, []);
    return (
    <div className="col-4 p-2">
          <LabelForm />
          <div className="card p-2 text-center">
            { Labels.map((label) => (
                <NavLink to={"/labels/"+label.id} className={"label-menu-link"} key={label.id}>
                    <div className="card-title ">{label.name}</div>
                    <div className="card-icon">
                    <IoTrashOutline />
                    </div>
                </NavLink>
            ))}
          </div>
        </div>
  )
}

export default Navbar