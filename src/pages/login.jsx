import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { login } from "../operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const loginwithgoogle = () => {
    // window.open("http://localhost:4000/auth/google/callback", "_self");
    window.open("https://dsa-jfnl.onrender.com/auth/google/callback", "_self");
  };

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="login-page">
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <div className="form">
        <form onSubmit={handleOnSubmit} className="login-form">
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
            />
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
            />
            <span onClick={() => setShowPassword((prev) => !prev)} className="">
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {/* <Link to='/forgot-password'>
          <p className='mt-1 ml-auto max-w-max text-xs text-blue-100'>
            Forgot Password?
          </p>
        </Link> */}
          </label>
          <p className="message">
            Not Registerd? <a href="/signup">Create an account</a>
          </p>
          <button type="submit">Sign In</button>
        </form>
        <button className="login-with-google-btn" onClick={loginwithgoogle}>
          Login In With Google
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
