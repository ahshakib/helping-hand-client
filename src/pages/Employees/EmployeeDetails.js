import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import EmployeeAbout from "../../components/Employees/EmployeeAbout";
import EmployeeReview from "../../components/Employees/EmployeeReview";
import Footer from "../../components/Home/Footer";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";
import { getApiUrl, getImageUrl } from "../../api";

const EmployeeDetails = () => {
  const [toggle, setToggle] = useState(false)
  const [tab, setTab] = useState("About")
  const { id } = useParams();
  const { employee, setEmployee } = useAuth()

  useEffect(() => {
    if(!employee.name) {
      const fetchData = async() => {
        try {
          const response = await fetch(getApiUrl(`/employee/${id}`));
          const result = await response.json();
          if(result.status) {
            setEmployee(result.employee);
          } else {
            setEmployee({});
          }
        } catch (error) {
          fetchData();
        }
      }
      fetchData();
    }
  }, [employee.name, id, setEmployee])

  const handleTabChange = (tabName) => {
    if (tab !== tabName) {
      setToggle(curr => !curr)
      setTab(tabName)
    }
  }
  
  const isUrl = (path) => {
    try {
      const url = new URL(path);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  const imageUrl = employee.image 
    ? (isUrl(employee.image) 
        ? employee.image 
        : getImageUrl(employee.image))
    : "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Page Header */}
      <div className="relative bg-gradient-to-r from-accent-600 via-primary-600 to-accent-700 py-12 mb-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            to="/employees" 
            className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Employees
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-white animate-fade-in">
            Professional Profile
          </h1>
        </div>
      </div>
 
      {/* Employee Profile Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={imageUrl}
              alt={employee.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
              className="w-32 h-32 rounded-full shadow-lg border-4 border-primary-100 object-cover"
            />
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold font-heading text-gray-800 mb-2">
                {employee.name}
              </h2>
              <p className="text-lg text-gray-600 mb-2">{employee.bio}</p>
              <p className="text-2xl font-bold text-primary-600">
                ৳{Number(employee.rate || 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-8 border-b border-gray-200">
            <div className="flex space-x-8">
              <button 
                onClick={() => handleTabChange("About")} 
                className={`pb-4 px-2 text-lg font-semibold transition-all border-b-2 ${
                  !toggle 
                    ? 'text-primary-600 border-primary-600' 
                    : 'text-gray-500 border-transparent hover:text-primary-500 hover:border-primary-300'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => handleTabChange("Review")} 
                className={`pb-4 px-2 text-lg font-semibold transition-all border-b-2 ${
                  toggle 
                    ? 'text-primary-600 border-primary-600' 
                    : 'text-gray-500 border-transparent hover:text-primary-500 hover:border-primary-300'
                }`}
              >
                Ratings and Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="container mx-auto px-4 pb-16">
        {employee.name && tab === "About" && <EmployeeAbout employee={employee} />}
        {employee.name && tab === "Review" && <EmployeeReview />}
      </div>

      <Footer />
    </div>
  );
};

export default EmployeeDetails;
