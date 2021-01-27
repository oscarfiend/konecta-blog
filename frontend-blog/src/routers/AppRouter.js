import React from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import LoginScreen from "../components/login/LoginScreen";
import DashboardRouter from "./DashboardRouter";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { useSelector } from "react-redux";

import {userAutenticated } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import NewAccountScreen from "../components/login/NewAccountScreen";

const AppRouter = () => {

  const userData=JSON.parse(localStorage.getItem('dataUser'))
  const dispatch=useDispatch()
  if(userData){
    dispatch(userAutenticated())
  } 

const logged = useSelector(state => state.user.logged);
const cargando=useSelector(state=>state.user.cargandoUsuario)

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoutes
            isAutenticated={logged}
            exact
            path="/login"
            component={LoginScreen}
          />
          <PublicRoutes
            isAutenticated={logged}
            path="/newuser"
            component={NewAccountScreen}
          />
          <PrivateRoutes
            isAutenticated={logged}
            cargando={cargando}
            path="/"
            component={DashboardRouter}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
