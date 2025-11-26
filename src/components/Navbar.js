import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../images/helping-hand-logo.png";

function Navbar() {
  const { user } = useAuth();
  
  const linkBaseClass = "px-4 py-2 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group";
  const linkActive = "bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg";
  const linkInactive = "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-primary-500 hover:to-primary-700 hover:shadow-md";
  
  return (
    <nav className="bg-white/80 backdrop-blur-md h-20 sticky top-0 shadow-lg z-50 border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center h-full px-4">
        {/* Logo Section */}
        <Link to="/" className="group flex items-center">
          <img 
            src={logo} 
            alt="Helping Hand" 
            className="w-32 transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-2">
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `${linkBaseClass} ${isActive ? linkActive : linkInactive}`
            }
          >
            <span className="relative z-10">Services</span>
          </NavLink>
          
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `${linkBaseClass} ${isActive ? linkActive : linkInactive}`
            }
          >
            <span className="relative z-10">Employees</span>
          </NavLink>

          {user.email ? (
            <>
              {user.role === "user" && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `${linkBaseClass} ${isActive ? linkActive : linkInactive}`
                  }
                >
                  <span className="relative z-10">Dashboard</span>
                </NavLink>
              )}

              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `${linkBaseClass} ${isActive ? linkActive : linkInactive}`
                  }
                >
                  <span className="relative z-10">Admin</span>
                </NavLink>
              )}

              {user.role === "employee" && (
                <NavLink
                  to="/employee"
                  className={({ isActive }) =>
                    `${linkBaseClass} ${isActive ? linkActive : linkInactive}`
                  }
                >
                  <span className="relative z-10">Employee</span>
                </NavLink>
              )}
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${linkBaseClass} ${isActive ? linkActive : linkInactive}`
              }
            >
              <span className="relative z-10">Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
