import types from "../types/types";
import { clienteAxios } from "../../axios/clienteAxios";
import tokenAuth from "../../config/tokenAuth";


//thunk function async for the login
export const  loginAction=(payload)=>{
    return async (dispatch)=>{
        try {
            // log the user and put the data en localstorage
            const res=await clienteAxios.post('login',payload)
            localStorage.setItem('dataUser',JSON.stringify(res.data))
            // autenticate the user
            dispatch(userAutenticated())
          } catch (error) {
              dispatch(logError(error?.response.data.message));

          }
    }
    
}

//thunk function async for the signup user
export const signupAction=(payload)=>{
    return async (dispatch)=>{
        try {
            await clienteAxios.post('register',payload)
            // if the user is registered do the login
            dispatch(loginAction(payload))
        } catch (error) {
            dispatch(logError('The user has not been created'));
        }
    }
}

//thunk function async for user autenticate
export const userAutenticated=()=>{
    return async(dispatch)=>{
        const dataUser=JSON.parse(localStorage.getItem('dataUser'))
        const token=dataUser?.token
        if(token){
            //funcion para enviar el token por headers
            tokenAuth(token)
        }
        
        try {
            const respuesta=await clienteAxios.post('/auth',{'token':token})
            const data={
                user:respuesta.data.user
            }
            dispatch(loginUser(data))
            
        } catch (error) {
            dispatch(logError())
        }
    }
}

export const selectUser=(user)=>({
    type:types.selectUser,
    payload:user
})


export const loginUser=(payload)=>({
    type:types.login,
    payload
})

export const logError=(msg)=>({
    type:types.loginError,
    payload:msg
})

export const closeUserSesion=()=>({
    type:types.logout
})  

export const selectCategory=(category)=>({
    type:types.selectCategory,
    payload:category
})

export const selectArticle=(article)=>({
    type:types.selectArticle,
    payload:article
})

export const clearErrors=()=>({
    type:types.clearError
})

export const loadData=()=>({
    type:types.loadingData
})
