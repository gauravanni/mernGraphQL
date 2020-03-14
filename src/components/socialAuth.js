import React,{useState,useEffect} from "react";
import { useMutation } from '@apollo/react-hooks';
//import { ADD_USER } from "./queries/user";
import { GoogleLogin,GoogleLogout  } from 'react-google-login';
import { gql } from 'apollo-boost';


const ADD_USER = gql`
mutation authGoogle($name:String,$email:String,$avatar:String) {
  authGoogle(name:$name,email:$email,avatar:$avatar) {
    name
    email
    avatar
    }
  }
`;

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const [addUser] = useMutation(ADD_USER);

  const responseGoogle=(response) => {
      console.log(response)
      setName(response.profileObj.name)
      setEmail(response.profileObj.email)
      setAvatar(response.profileObj.imageUrl)
      setisLoggedIn(true)
      addUser({ variables: {name:name,email:email,avatar:avatar}});
  }

  const fail=(err)=>{
    console.log('err',err)
  }

  const logout=()=>{
    setisLoggedIn(false);
  }

  const gmailContent=(
      <div>
      <h4>{name}</h4>
       <h4>{email}</h4>
       <img src={avatar} alt={name} />
    </div>
  )

  const logoutContent=(
    <GoogleLogout
    clientId="160748872523-tc047cshaj90rs8mp898um5418qmn3f7.apps.googleusercontent.com"
    buttonText="Logout"
    onLogoutSuccess={logout}>
  </GoogleLogout>
  )


return (
  <div className="App">
    <h1>Social Auth</h1>
    {!isLoggedIn && (
      <GoogleLogin
      clientId="160748872523-tc047cshaj90rs8mp898um5418qmn3f7.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={fail}
    />
    )}
    
    { isLoggedIn && gmailContent}
    { isLoggedIn && logoutContent} 
    
  </div>
);
  
}

export default App;
