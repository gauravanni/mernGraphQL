import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import { GoogleLogin,GoogleLogout  } from 'react-google-login';

class App extends Component {
   constructor(props) {
      super(props);
      this.state={
        name:'',
        email:'',
        avatar:'',
        isLoggedIn:false
      }
   }
   
   responseGoogle=(res)=>{
     console.log(res)
      const {name,email,imageUrl}=res.profileObj;
      console.log(name)
      this.setState(()=>({name,email,avatar:imageUrl,isLoggedIn:true}))
      
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
      
      fetch('http://localhost:4000/', {
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

   fail=(err)=>{
    console.log(err)
   }

   logout=()=>{
    this.setState(()=>({isLoggedIn:false}))
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
              <Header data={this.state} />
              {!this.state.isLoggedIn && (
                <GoogleLogin
                clientId="160748872523-tc047cshaj90rs8mp898um5418qmn3f7.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.fail}
                className="googleBtn"
                />
              )}
              {this.state.isLoggedIn && this.logoutContent}
         </div>
      );
   }
   
}

export default App;