import React, { useState, useRef, useEffect } from "react";
import "./account.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import FaceIcon from "@mui/icons-material/Face";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { login, Register, clearErrors } from "../../Actions/UserAction";
import { ToastError } from "../Alert-POP's/Alertpop";
import Loader from "../layouts/LoadingFiles/Loader";
const Account = () => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [swtichtab, setswtichtab] = useState(true);
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [signupDetails, setsignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [uploadProfile, setuploadProfile] = useState(null);

  const loginRef = useRef(null);
  const signupRef = useRef(null);

  const navigate = useNavigate();

  const [search_redirect] = useSearchParams();
  const redirectTo = search_redirect.get("redirect")
    ? search_redirect.get("redirect")
    : "account";

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(`/${redirectTo}`);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirectTo]);

  const SwitchAccount = () => {
    if (swtichtab) {
      setswtichtab(false);
      loginRef.current.classList.add("moveLeft");
      signupRef.current.classList.add("signupNeutral");
    } else {
      setswtichtab(true);
      loginRef.current.classList.remove("moveLeft");
      signupRef.current.classList.remove("signupNeutral");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const onchangeSignup = (e) => {
    setsignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };
  const signupSubmit = (e) => {
    e.preventDefault();
    const RegisterFormData = new FormData();
    RegisterFormData.append("name", signupDetails.name);
    RegisterFormData.append("email", signupDetails.email);
    RegisterFormData.append("password", signupDetails.password);
    if (uploadProfile === null) {
      ToastError("please upload the profile");
      return;
    }
    RegisterFormData.append("ProfileAvatar", uploadProfile);
    dispatch(Register(RegisterFormData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="accountContainer">
          <div className="wrapper">
            <div className="accountToggle">
              <p
                className={swtichtab ? "activeLink" : ""}
                onClick={SwitchAccount}
              >
                Login
              </p>
              <p
                className={swtichtab ? "" : "activeLink"}
                onClick={SwitchAccount}
              >
                Register
              </p>
            </div>

            <div>
              {/* onSubmit={loginSubmit} */}
              <form className="loginForm" ref={loginRef}>
                <div>
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setloginEmail(e.target.value)}
                  />
                </div>
                <div>
                  <LockOpenOutlinedIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    autoComplete="on"
                    onChange={(e) => setloginPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot">Forget Password ?</Link>

                {/* <input type="submit" value="Login" className="loginBtn" /> */}
                <input
                  type="button"
                  value="Login"
                  className="loginBtn"
                  onClick={loginSubmit}
                />
              </form>

              <form
                className="signupForm"
                ref={signupRef}
                encType="multipart/form-data"
                onSubmit={signupSubmit}
              >
                <div>
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    onChange={onchangeSignup}
                  />
                </div>

                <div>
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    onChange={onchangeSignup}
                  />
                </div>

                <div className="">
                  <LockOpenOutlinedIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    autoComplete="on"
                    onChange={onchangeSignup}
                  />
                </div>

                <div className="imageDi">
                  <AccountCircleIcon />
                  <input
                    type="file"
                    onChange={(e) => {
                      setuploadProfile(e.target.files[0]);
                    }}
                  />
                </div>
                <br />
                <input type="submit" value="Register" className="signupBtn" />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
