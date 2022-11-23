// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//auth
import Login from "./Pages/Authentication/Login/Login";
import ApplicantRegister from "./Pages/Applicant/Register";
//dashboard
import EmployeeDashboard from "./Pages/Employee/Dashboard";
import ExecutiveDashboard from "./Pages/Executive/Dashboard";
import ApplicantDashboard from "./Pages/Applicant/Dashboard";
import AdminDashboard from "./Pages/Admin/Dashboard";
//profileupdate
import ManageEmployee from "./Pages/Admin/ManageEmployee";
import Profile from "./Pages/User/Profile";
import UpdateUsername from "./Pages/User/Pages/updateusername";
import UpdatePassword from "./Pages/User/Pages/updatepassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<ApplicantRegister />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/executive/dashboard" element={<ExecutiveDashboard />} />
        <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-employee" element={<ManageEmployee />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update-username" element={<UpdateUsername />} />
        <Route path="/profile/update-password" element={<UpdatePassword />} />
      </Routes>
    </div>
  );
}

export default App;
