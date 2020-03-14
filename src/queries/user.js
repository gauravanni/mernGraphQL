import { gql } from 'apollo-boost';

export const ADD_USER = gql`
  mutation authGoogle($name: String, $email: String, $avatar: String) {
    authGoogle(name: $name, email: $email, avatar: $avatar){
        name
        email
        avatar
    }
    
  }
`;