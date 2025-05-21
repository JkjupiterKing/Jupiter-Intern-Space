import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/login";
import ForgotPassword from "./Components/forgot-password/forgot-password";
import Navbar from "./Components/navbar/navbar";
import CollegeManagement from "./Components/college-management/college-management";
import InternManagement from "./Components/intern-management/intern-management";
import InternshipTechnologies from "./Components/internship-technologies/internship-technologies";
import Dashboard from "./Components/Dashboard/dashboard";
import Certificatemanagement from "./Components/certificate-management/certificate-management";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/college-management" element={<CollegeManagement />} />
        <Route path="/intern-management" element={<InternManagement />} />
        <Route
          path="/internship-technologies"
          element={<InternshipTechnologies />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/certificate-management"
          element={<Certificatemanagement />}
        />
      </Routes>
    </Router>
  );
}

export default App;
