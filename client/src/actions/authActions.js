import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_MEMBRE } from './types'
// Register USer

export const registerMembre = (membreData, history) => dispatch => {
   axios
      .post('/api/membre/register', membreData)
      .then(res => history.push('/login'))
      .catch(err => 
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          }));
}


// history ===> redirection

//Login - Get User Token

export const loginMembre = (membreData) => dispatch => {
    axios
       .post('/api/membre/login', membreData)
       .then(res => {
           // Save to localStorage
           const { token } = res.data;

           //Set token to ls
           localStorage.setItem('jwtToToken', token);

           // Set token to Auth header
           setAuthToken(token);

           //Decode token to get user data
           const decoded = jwt_decode(token);

           // Set current user
           dispatch(setCurrentMembre(decoded));

           //history.push('/dashboard')
       })
       .catch(err => 
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
          );
}

// Set logged in membre
export const setCurrentMembre = (decoded) =>{
    return {
        type: SET_CURRENT_MEMBRE,
        payload: decoded
    }
}