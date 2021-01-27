import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PublicRoutes = ({
    isAutenticated,
    component:Component,
    ...rest
}) => {
    return (
        <div>
            <Route
            {...rest}
            component={(props)=>(
                (!isAutenticated)?
                <Component {...props}/>
                :
                <Redirect to="/home"/> 
            )
            }
            />
        </div>
    )
}

PublicRoutes.propTypes = {

}

export default PublicRoutes
