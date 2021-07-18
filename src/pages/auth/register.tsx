import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register=({history})=> {
  const [email, setEmail] = React.useState("");

   
  const {user} = useSelector((state:any)=>({...state}))

  useEffect(() => {
     if(user && user.token) history.push('/');
  }, [user,history]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // this is the firebase stuff
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL, // where that email link will redirect to
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
     // this is the request sent to firebase
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registeration in your email `
    );

    window.localStorage.setItem("emailForRegistration", email); // storing the email so that user doesnt have to type it again

    setEmail("");
  };

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Your Email"
        />
        <br/>
        <button type="submit" className="btn btn-raised" disabled={!email}>
          Register
        </button>
      </form>
    );
  };
  return (
    <div className="p-10 w-full justify-center">
      <div>
        <h4>Register</h4>
        {registerForm()}
      </div>
    </div>
  );
}

export default Register;
