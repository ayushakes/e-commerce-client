import React, { useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LOGGED_IN_USER } from "../../store/reducers/actionTypes";
import { Link } from "react-router-dom";
import axios from "axios";
import { createOrUpdateUser } from "../../functions/auth";
import { UserType } from "../../constants/userTypes";

const Login = ({ history }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { user } = useSelector((state: any) => ({ ...state }));

  const roleBasedRedirect = (res) => {
    const intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    }
    if (res.data.role === UserType.ADMIN) {
      history.push("admin/dashboard"); // todo create these routes
    } else {
      history.push("/user/history");
    }
  };

  useEffect(() => {
    const intended = history.location.state;
    if (intended) {
      return;
    }
    if (user && user.token) history.push("/");
  }, [user, history]);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // this is the firebase stuff
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          setLoading(false);
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
          roleBasedRedirect(res);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(`error occured ${err.message}`);
          console.log("request from ui failed ");
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            setLoading(false);

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
            roleBasedRedirect(res);

            toast.success("successfully signed in with google");
          })
          .catch((err) => {
            setLoading(false);
            toast.error(`error occured ${err.message}`);
            console.log("request from ui failed ");
          });

        history.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            placeholder="Your Email"
          />
        </div>

        <br />
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            placeholder="Your Passowrd"
          />
        </div>
        <button
          type="submit"
          className="btn btn-raised"
          disabled={!email || password.length < 6}
        >
          {loading ? (
            <h4 className="text-danger ">Loading ....</h4>
          ) : (
            <h4>Login</h4>
          )}
        </button>
      </form>
    );
  };
  return (
    <div className="p-10 w-full justify-center">
      <div>
        <h4>Login</h4>
        {loginForm()}
        <button onClick={googleLogin} className="btn btn-raised">
          Login with google{" "}
        </button>
        <div className="ml-auto mt-10">
          <Link to="/forgot-password" className="text-danger">
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
