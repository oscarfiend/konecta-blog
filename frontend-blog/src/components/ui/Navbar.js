import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink, useHistory} from 'react-router-dom';
import { closeUserSesion } from "../../redux/actions/userActions";


const Navbar = () => {

  const {user} = useSelector(state => state.user)

  const dispatch = useDispatch()

  const history=useHistory();

  const closeSesion=()=>{
    dispatch(closeUserSesion())
    history.push('/login')
    
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div className="container-fluid ">
      <NavLink className="navbar-brand" to="/home">
        <img src="/logo.png" alt="" height="64" className="d-inline-block align-top"/>
      </NavLink>
      <div className="navbar-collapse text-nav" id="navbarTogglerDemo03">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <NavLink className="nav-link" exact activeClassName="text-danger bg-navlink" aria-current="page" to="/home">Home</NavLink>
          </li>
          {user?.role==="Administrador" &&
          <>
          <li className="nav-item">
            <NavLink className="nav-link" exact activeClassName="text-danger bg-navlink" aria-current="page" to="/users">Users</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact activeClassName="text-danger bg-navlink" to="/categories">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact activeClassName="text-danger bg-navlink" to="/articles" aria-disabled="true">List articles</NavLink>
          </li>          
          </>
          }
        </ul>
      </div>
      <div className="mr-5 mt-3">
      <p>User: <span>{user?.name}</span></p>
      </div>
      <div >      
        <button className="btn btn-outline-secondary" onClick={closeSesion}>Close sesion</button>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
