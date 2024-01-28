import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../operations/authAPI";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when the user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } =
      signupData;

    dispatch(
      signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div>
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Verify Email
          </h1>
          <p>A verification code has been sent to you. Enter the code below</p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    fontSize: "1.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginRight: "8px",
                    outline: "none",
                  }}
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              style={{
                marginTop: "1rem",
                backgroundColor: "#007bff",
                color: "#fff",
                fontWeight: "bold",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Verify Email
            </button>
          </form>
          <div
            className="mt-6 flex items-center justify-between"
            style={{ marginTop: "1.5rem" }}
          >
            <Link
              to="/signup"
              style={{
                color: "#007bff",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p>
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              onClick={() => dispatch(sendOtp(signupData.email))}
              style={{
                color: "#007bff",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <RxCountdownTimer /> Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
