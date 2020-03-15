import {SET_AUTH,LOGOUT} from '../actions/types'

const initialState={name:'',email:'',imageUrl:'',isLoggedIn:false}

export default (state=initialState,action)=>{
    const {payload}=action
    switch(action.type){
        case SET_AUTH:
            return {...state,...payload}
        case LOGOUT:
            return {...state,isLoggedIn:false}
        default:
            return state
    }
}