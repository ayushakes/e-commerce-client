import React from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LOGGED_IN_USER } from "../../store/reducers/actionTypes";
import { createOrUpdateUser } from "../../functions/auth";


const RegisterComplete = ({ history }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);


  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // valdations for empty email and password 

    if(!email || !password){
        toast.error("Email and password is required ")
        return;
    }
// validation for password less than 6 digits 

   if(password.length<6){
    toast.error("Password must be atleast 6 characters long")
    return;
   }

    // try the user to sign in

    

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      // if above statement is successful then aur user will be saved in firebase 



      if(result.user.emailVerified){   // imp check to see if everything was fine 
         // remove email user from local storage 
         window.localStorage.removeItem('emailForRegistration')
         // get user id token 
         let user=auth.currentUser   
         await user.updatePassword(password);   // the password user entered in the state  . Updating the password of the user 
         const idTokenResult= await user.getIdTokenResult(); 
         // redux store -- saving user info in redux store . TODO  
         createOrUpdateUser(idTokenResult.token)
         .then((res) => {
           
 
           dispatch({
             type: LOGGED_IN_USER,
             payload: {
               name: res.data.name, // fields coming from backend are name , role and _id
               role: res.data.role,
               _id: res.data._id,
               email: user.email,
               token: idTokenResult.token,
             },
           });
           toast.success("successfully signed in");
         })
         .catch((err) => {
           
           toast.error(`error occured ${err.message}`);
           console.log("request from ui failed ");
         });
             
         // Redirect 
         history.push('/')

      }
    } catch (error) {

        toast.error(error.message)
    }
  };

  const completeRegisterForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input value={email} type="email" className="form-control" disabled />
        <br />
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          autoFocus
        />
        <button type="submit" className="btn btn-raised">
          Complete Registeration
        </button>
      </form>
    );
  };
  return (
    <div className="p-10 w-full justify-center">
      <div>
        <h4>Register</h4>
        {completeRegisterForm()}
      </div>
    </div>
  );
};

export default RegisterComplete;
