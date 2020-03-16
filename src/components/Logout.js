import React from 'react'
import { GoogleLogout  } from 'react-google-login';
import {connect} from 'react-redux'

import {logOut} from '../actions/auth'



function Logout(props) {
    const signout=()=>{
        props.logOut()
    }
    return (
        <div>
            {props.auth.isLoggedIn && (
                 <GoogleLogout
                 clientId="160748872523-tc047cshaj90rs8mp898um5418qmn3f7.apps.googleusercontent.com"
                 buttonText="Logout"
                 onLogoutSuccess={signout}>
                </GoogleLogout>
            )}
        </div>
    )
}

const mapStateToProps=(state)=>({
    auth:state.auth
  })
  
  export default connect(mapStateToProps,{logOut})(Logout);
