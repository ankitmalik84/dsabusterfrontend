import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../operations/authAPI";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({});
  console.log("response", userdata);

  const getUser = async () => {
    try {
      // Check if user is logged in with email and password
      const token = localStorage.getItem("token");
      if (token) {
        // If user is logged in, retrieve user data from local storage
        const user = JSON.parse(localStorage.getItem("user"));
        setUserdata(user);
      } else {
        // If not logged in with email and password, fetch user data from the server
        const response = await axios.get(
          // "http://localhost:4000/login/success",
          "https://dsa-jfnl.onrender.com/login/success",
          {
            withCredentials: true,
          }
        );
        setUserdata(response.data.user);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  };
  const handleLogin = () => {
    dispatch(logout(navigate));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {Object?.keys(userdata)?.length > 0 ? (
        <div style={{ margin: "20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: "bold" }}>Display Name</td>
                <td>
                  {" "}
                  {userdata.displayName
                    ? userdata.displayName
                    : userdata.firstName + " " + userdata.lastName}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold" }}>Dashboard</td>
                <td>
                  <p>Dashboard Content Goes Here</p>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button onClick={handleLogout}>Logout</button>
                </td>
              </tr>
              {userdata.image ? (
                <tr>
                  <td style={{ fontWeight: "bold" }}>Profile Image</td>
                  <td colSpan="2">
                    <img
                      src={userdata.image}
                      style={{
                        width: "50px",
                        borderRadius: "50%",
                        marginTop: "10px",
                      }}
                      alt=""
                    />
                  </td>
                </tr>
              ) : null}
              {/* <tr>
                <td style={{ fontWeight: "bold" }}>Profile Image</td>
                <td colSpan="2">
                  <img
                    src={userdata?.image}
                    style={{
                      width: "50px",
                      borderRadius: "50%",
                      marginTop: "10px",
                    }}
                    alt=""
                  />
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Home;
