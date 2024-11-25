import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "./context/AuthProvider";
import EmployeeDetails from "./pages/Employees/EmployeeDetails";
import Employees from "./pages/Employees/Employees";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ServiceDetails from "./pages/Services/ServiceDetails";
import Service from "./pages/Services/Services";
import PrivateOutlet from "./components/PrivateOutlet";
import Dashboard from "./pages/Dashboard/Dashboard";
import Admin from "./pages/Admin/Admin";
import Employee from "./pages/Employee/Employee";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/service-details/:id" element={<ServiceDetails />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employee-details/:id" element={<EmployeeDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<PrivateOutlet/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/employee" element={<Employee/>}/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
