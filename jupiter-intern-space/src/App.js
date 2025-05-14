import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/login";
import ForgotPassword from "./Components/forgot-password/forgot-password";
import Navbar from "./Components/navbar/navbar";
import collegemanagement from "./Components/college-management/college-management";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/college-management" element={<college-management />} />
      </Routes>
    </Router>
  );
}

export default App;
