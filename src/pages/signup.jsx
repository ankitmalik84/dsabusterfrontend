import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../slices/authSlice";
import { sendOtp } from "../operations/authAPI";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // student or instructor
  // const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
    };
    try {
      // Setting signup data to state
      // To be used after otp verification
      dispatch(setSignupData(signupData));
      // Send OTP to user for verification
      dispatch(sendOtp(formData.email, navigate));

      // Reset
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      // setAccountType(ACCOUNT_TYPE.STUDENT);
    } catch (error) {
      // =========here i do testing so jo code yaha likha h vo authAPI m likhna
      // tha but starting m trail kr ra tha iss liye yaha likhaa

      // old method
      // if (error.response && error.response.data && error.response.data.message) {
      //   toast.error(error.response.data.message) // Show the error message returned from the API
      // } else {
      //   toast.error("Failed to sign up. Please try again.")
      // }

      // modern method
      toast.error(
        error?.response?.data?.message ?? "Failed to sign up. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      <h1 style={{ textAlign: "center" }}>Signup</h1>
      <div className="form">
        {/* Tab */}
        {/* Form */}
        <form onSubmit={handleOnSubmit} className="login-form">
          <div className="flex gap-x-4">
            <label className="w-full">
              {/* <p className="">
                First Name <sup className="text-pink-200">*</sup>
              </p> */}
              <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
              />
            </label>
            <label>
              {/* <p className="">
                Last Name <sup className="text-pink-200">*</sup>
              </p> */}
              <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
              />
            </label>
          </div>
          <label className="w-full">
            {/* <p className="">
              Email Address <sup className="text-pink-200">*</sup>
            </p> */}
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
            />
          </label>
          <div className="flex gap-x-4">
            <label className="relative">
              {/* <p className="">
                Create Password <sup className="text-pink-200">*</sup>
              </p> */}
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <label className="relative">
              {/* <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm Password <sup className="text-pink-200">*</sup>
              </p> */}
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className=""
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
          </div>
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
