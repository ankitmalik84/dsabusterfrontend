// App.js
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux"; // Import the Provider
import store from "./store"; // Import your Redux store
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import VerifyEmail from "./pages/verifyEmail";

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Wrap your entire application with Provider */}
      <div className="">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
