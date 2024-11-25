import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingModal from "../Booking/BookingModal";

const EmployeeMiniCard = ({ employee }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <div className="bg-gray-50 border hover:border-cyan-400 rounded-md shadow-md p-2">
      <div className="items-center">
        <img
          src={employee.image}
          alt={employee.name}
          className="w-16 mx-auto rounded-full"
        />
        <div className="mt-3">
          <h2 className="text-center font-bold">{employee.name}</h2>
          <h2 className="text-center text-xs line-clamp-1 py-1">{employee.bio}</h2>
          <h3 className="text-center text-sm text-gray-800">৳{Number(employee.rate).toLocaleString()}</h3>
        </div>
        <div className="flex lg:block xl:flex items-center justify-between mt-3">
          <button onClick={openModal} className="bg-green-800 hover:bg-green-900 text-white rounded-full text-xs my-2 mx-auto text-center py-2 px-3">Book Now</button>
          <button onClick={() => navigate(`/employee-details/${employee._id}`)} className="bg-pink-800 hover:bg-pink-900 text-white rounded-full text-xs my-2 mx-auto text-center py-2 px-3">View Full Profile</button>
        </div>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900 ">Available Service Slots</h3>
          <button onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-500 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg></button>
        </div>
      </BookingModal>
    </div>
  );
};

export default EmployeeMiniCard;
