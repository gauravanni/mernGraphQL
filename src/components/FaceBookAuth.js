import React from 'react'
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux'

import {setAuth} from '../actions/auth'

function FaceBookAuth(props) {
    const responseFacebook=(res)=>{
        console.log('res',res);
    }
    return (
        <div>
            {!props.auth.isLoggedIn && (
            <FacebookLogin
                appId="468594710242226"
                fields="name,email,picture"
                callback={responseFacebook}
            />
            )}
        </div>
    )
}

const mapStateToProps=(state)=>({
    auth:state.auth
})

export default connect(mapStateToProps,{setAuth})(FaceBookAuth)
