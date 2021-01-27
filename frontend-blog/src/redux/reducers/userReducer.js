import types from "../types/types"

const initialState = {
    user:null,
    token:'',
    logged:false,
    error:false,
    userSelected:null,
    categorySelected:null,
    articleSelected:null,
    msgError:'',
    cargandoUsuario:true,
    loadingData:false
}

// eslint-disable-next-line import/no-anonymous-default-export
const userReducer =(state = initialState, { type, payload })=>{
    //console.log(type);
    switch (type) {
        // case for user login
    case types.login:
        return { 
            ...state, 
            user:payload.user,
            logged:true,
            error:false,
            msgError:'',
            cargandoUsuario:false
        }
        // case for the user logout
    case types.logout:
        localStorage.removeItem('dataUser')
        return{
            ...initialState,
            loadingUser:false
        }
        // case for user edit
    case types.selectUser:
        return{
            ...state,
            userSelected:payload
        }
        // case for diferent erros
    case types.loginError:
        return{
            ...initialState,
            error:true,
            msgError:payload,
            // cargandoUsuario:false
        }
        // set the errors in the initial state
    case types.clearError:
        return{
            ...state,
            error:false,
            msg:""
        }
        // case for select one category
    case types.selectCategory:
        return{
            ...state,
            categorySelected:payload
        }
        // case for select one article
        case types.selectArticle:
            return{
                ...state,
                articleSelected:payload
            }
            // case for the data is loading
    case types.loadingData:
        return{
            ...state,
            loadingData:!state.loadingData
        }
    default:        
        return state
    }
}

export default userReducer;