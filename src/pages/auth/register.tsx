import React from "react";

export default function Register() {
  const [email, setEmail] = React.useState("");
  const handleSubmit = () => {};

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <button type="submit" className="btn btn-raised" >Register</button>
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
