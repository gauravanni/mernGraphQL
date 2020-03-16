import React from 'react'
import { GoogleLogin  } from 'react-google-login';
import {connect} from 'react-redux'

import {setAuth} from '../actions/auth'


const GoogleAuth=(props)=> {

   const responseGoogle=(res)=>{
        const {name,email,imageUrl}=res.profileObj;
        props.setAuth({name,email,imageUrl,isLoggedIn:true})
        const requestBody = {
          query: `,
            mutation {
              authGoogle(name:"${name}",email:"${email}",avatar:"${imageUrl}") {
                name
                email
                avatar
              }
            }
          `
        };
        
        fetch('https://nodegraphqlauth.herokuapp.com/', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
          return res.json();
        }).then(resData => {
            console.log(resData);
          }).catch(err => {
            console.log(err);
          });
   }

   const fail=()=>{
       console.log('fail')
   }

    return (
        <div>
            {!props.auth.isLoggedIn && (
                <GoogleLogin
                  clientId="160748872523-tc047cshaj90rs8mp898um5418qmn3f7.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={fail}
                  className="googleBtn"
                />
              )}
        </div>
    )
}

const mapStateToProps=(state)=>({
    auth:state.auth
})

export default connect(mapStateToProps,{setAuth})(GoogleAuth)
