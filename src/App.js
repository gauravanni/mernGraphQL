import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import Header from './components/header'
import {setAuth,logOut} from './actions/auth'
import { GoogleLogin,GoogleLogout  } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


class App extends Component {
   
   responseGoogle=(res)=>{
      const {name,email,imageUrl}=res.profileObj;
      this.props.setAuth({name,email,imageUrl,isLoggedIn:true})
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

   responseFacebook=(res)=>{
    console.log('res',res);
   }
   

   fail=(err)=>{
    console.log(err)
   }

   logout=()=>{
    this.props.logOut()
  }
    
   logoutContent=(
    <GoogleLogout
      clientId="160748872523-tc047cshaj90rs8mp898um5418qmn3f7.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={this.logout}>
    </GoogleLogout>
  )
  
   render() {
      return (
         <div className="App">
              <Header />
              {!this.props.auth.isLoggedIn && (
                <GoogleLogin
                  clientId="160748872523-tc047cshaj90rs8mp898um5418qmn3f7.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.fail}
                  className="googleBtn"
                />
              )}
              <FacebookLogin
                appId="468594710242226"
                fields="name,email,picture"
                callback={this.responseFacebook}
              />
              {this.props.auth.isLoggedIn && this.logoutContent}
         </div>
      );
   }
   
}

const mapStateToProps=(state)=>({
  auth:state.auth
})

export default connect(mapStateToProps,{setAuth,logOut})(App);