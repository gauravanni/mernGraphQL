import React, { Component } from 'react';

import './App.css';
import Header from './components/Header'
import GoogleAuth from './components/GoogleAuth'
import FaceBookAuth from './components/FaceBookAuth'
import Logout from './components/Logout'



class App extends Component {
  
   render() {
      return (
         <div className="App">
              <Header />
              <GoogleAuth />
              <FaceBookAuth />
              <Logout />
         </div>
      );
   }
   
}



export default App;