
import axios from "axios";


export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {}, // leaving body empty right now
    { headers: { authtoken: authtoken } } // sending token in headers
  );
  // return await axios.post( `${process.env.REACT_APP_API}/create-or-update-user`,{},{headers:{authToken:authToken}})
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {}, // leaving body empty right now
    { headers: { authtoken: authtoken } } // sending token in headers
  );
};


export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {}, // leaving body empty right now
    { headers: { authtoken: authtoken } } // sending token in headers
  );
};
