import {SET_AUTH,LOGOUT} from './types'
export const setAuth=({name,email,imageUrl,isLoggedIn})=>disapatch=>{
    disapatch({
        type:SET_AUTH,
        payload:{name,email,imageUrl,isLoggedIn}
    })
}

export const logOut=()=>disapatch=>{
    disapatch({
        type:LOGOUT
    })
}