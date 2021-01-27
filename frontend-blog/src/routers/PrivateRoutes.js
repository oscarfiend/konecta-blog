import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import PropTypes from 'prop-types';

const PrivateRoutes = ({
    isAutenticated,
    cargando,
    component:Component,
    ...rest
}) => {

    return (
        <div>
            <Route  
            {...rest}
            component={(props)=>(
                (isAutenticated || cargando)?                
                <Component {...props}/>
                :                
                <Redirect to="/login"/>
            )
            }
            />
        </div>
    )
}

PrivateRoutes.propTypes={
    isAutenticated:PropTypes.bool.isRequired,
    component:PropTypes.func.isRequired
}

export default PrivateRoutes
