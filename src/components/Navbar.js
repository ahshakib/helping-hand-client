import { Link, NavLink } from "react-router-dom";
import logo from "../images/helping-hand-logo.png";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user } = useAuth();
  return (
    <div className="bg-white h-24 sticky top-0 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center pt-3">
        <Link to="/">
          <img src={logo} alt="Helping Hand" className="w-28" />
        </Link>
        <div className="ms-auto">
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "px-3 py-2 text-white border border-pink-800 rounded-md bg-pink-800 mx-2"
                : "px-3 py-2 mx-2 border rounded-md border-pink-800 text-black hover:bg-pink-800 hover:text-white"
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              isActive
                ? "px-3 py-2 text-white border border-pink-800 rounded-md bg-pink-800 mx-2"
                : "px-3 py-2 mx-2 border rounded-md border-pink-800 text-black hover:bg-pink-800 hover:text-white"
            }
          >
            Employees
          </NavLink>

          {user.email ? (
            <>
              {user.role === "user" && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "px-3 py-2 text-white border border-pink-800 rounded-md bg-pink-800 mx-2"
                      : "px-3 py-2 mx-2 border rounded-md border-pink-800 text-black hover:bg-pink-800 hover:text-white"
                  }
                >
                  Dashboard
                </NavLink>
              )}

              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive
                      ? "px-3 py-2 text-white border border-pink-800 rounded-md bg-pink-800 mx-2"
                      : "px-3 py-2 mx-2 border rounded-md border-pink-800 text-black hover:bg-pink-800 hover:text-white"
                  }
                >
                  Admin
                </NavLink>
              )}

              {user.role === "employee" && (
                <NavLink
                  to="/employee"
                  className={({ isActive }) =>
                    isActive
                      ? "px-3 py-2 text-white border border-pink-800 rounded-md bg-pink-800 mx-2"
                      : "px-3 py-2 mx-2 border rounded-md border-pink-800 text-black hover:bg-pink-800 hover:text-white"
                  }
                >
                  Employee
                </NavLink>
              )}
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "px-3 py-2 text-white border border-pink-800 rounded-md bg-pink-800 mx-2"
                  : "px-3 py-2 mx-2 border rounded-md border-pink-800 text-black hover:bg-pink-800 hover:text-white"
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
