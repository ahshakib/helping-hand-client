import React from "react";
import useAuth from "../../hooks/useAuth";

const EmployeeAbout = ({ employee }) => {
  const { slots, services } = useAuth()


  const categories = employee.services.map(serviceName => (services.find(service => service.name === serviceName) || {}).category) || "No category";
  const uniqueCategories = [...new Set(categories)];

  const timeFormatter = (time) => {
    const [hours, minutes] = time.split(":");
    return hours < 12
      ? `${hours}:${minutes} AM`
      : `${hours % 12 || 12}:${minutes} PM`;
  };

  return (
    <div className="bg-red-50 py-10">
      <div className="container mx-auto p-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="">
            <div className="bg-white border rounded-md p-5 w-full md:w-11/12">
              <h2 className="text-xl font-semibold">Policies</h2>

              <div className="flex items-center mt-5 gap-2">
                <div className="">
                  <i class="bx bx-map text-xl"></i>
                </div>
                <div className="">
                  <p className="text-sm text-gray-500">From</p>
                  <p className="text-sm mt-1">{employee.location}</p>
                </div>
              </div>

              <div className="flex items-center mt-5 gap-2">
                <div className="">
                  <span className="text-2xl font-bold ms-1">৳</span>
                </div>
                <div className="">
                  <p className="text-sm text-gray-500">Service Rate</p>
                  <p className="text-sm mt-1">
                    ৳{Number(employee.rate).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-md p-5 w-full md:w-11/12 mt-5">
              <h2 className="text-xl font-semibold">Service Slots</h2>

              <div className="divide-y divide-slate-400 mt-5">
                {
                  slots.length > 0 &&
                slots.map((slot) => (
                  <div
                    key={slot._id}
                    className="grid grid-cols-2 items-center py-2"
                  >
                    <div className="text-sm text-gray-500">{slot.label}</div>
                    <div className="text-sm text-gray-500 text-end">
                      {timeFormatter(slot.start_time)} -{" "}
                      {timeFormatter(slot.end_time)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-5 md:pt-0">
            <h3 className="text-xl font-bold">Employee Information</h3>
            <p className="text-justify text-sm leading-6 text-gray-600 mt-3">{employee.details}</p>
            
            <div className="border rounded-md bg-white mt-5 p-5">
            <h3 className="text-xl font-bold">Categories</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {
                uniqueCategories.length > 0 &&
                uniqueCategories.map(category => (
                  <p key={category} className="text-sm p-2 rounded-full border border-gray-400">{category}</p>
                ))
              }
            </div>
            </div>
            <div className="border rounded-md bg-white mt-5 p-5">
            <h3 className="text-xl font-bold">Services</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {
                employee.services.length > 0 &&
                employee.services.map(service => (
                  <p key={service} className="text-sm p-2 rounded-full border border-gray-400">{service}</p>
                ))
              }
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAbout;
