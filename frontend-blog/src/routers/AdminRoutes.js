import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import PropTypes from 'prop-types';

const AdminRoutes = ({
    role,
    component:Component,
    ...rest
}) => {
    return (
        <div>
            <Route  
            {...rest}
            component={(props)=>(
                (role==="Administrador")?
                <Component {...props}/>                
                :                
                <Redirect to="/home"/>
            )
            }
            />
        </div>
    )
}

AdminRoutes.propTypes={
    //role:PropTypes.string.isRequired,
    component:PropTypes.func.isRequired
}

export default AdminRoutes
