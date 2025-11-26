import EmployeeCard from "../../components/Employees/EmployeeCard";
import Footer from "../../components/Home/Footer";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";

function Employees() {
  const { employees } = useAuth()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Page Header */}
      <div className="relative bg-gradient-to-r from-accent-500 via-accent-600 to-primary-600 py-16 mb-12">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white text-center mb-4 animate-fade-in">
            Our Professionals
          </h1>
          <p className="text-xl text-white/90 text-center max-w-2xl mx-auto animate-fade-in delay-200">
            Meet our team of verified and experienced service professionals
          </p>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {employees.map((employee, index) => (
            <div key={employee._id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <EmployeeCard employee={employee} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Employees;
