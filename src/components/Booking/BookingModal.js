import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

function BookingModal({ isOpen, onClose, children }) {
  const { slots } = useAuth();
  const [bookingError, setBookingError] = useState("");

  const timeFormatter = (time) => {
    const [hours, minutes] = time.split(":");
    return hours < 12
      ? `${hours}:${minutes} AM`
      : `${hours % 12 || 12}:${minutes} PM`;
  };
  return (
    <div
      className={`fixed inset-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto transition-opacity duration-300 ease-in-out
    ${isOpen ? "flex" : "hidden"}`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg w-96">
        {children}
        <div className="p-4 md:p-5">
          <p className="text-gray-500">Select your desired slot:</p>
          <p className="text-rose-500 text-sm">{bookingError}</p>
          {
            <ul className="space-y-4 mb-4 max-h-80 overflow-auto p-2">
              {slots.length > 0 &&
                slots.map((slot) => (
                  <li key={slot._id}>
                    <input
                      onChangeCapture={() => {}}
                      type="radio"
                      id={`slot-${slot._id}`}
                      name="slot"
                      value={slot.label}
                      className="hidden peer"
                      required
                    />
                    <label
                      htmlFor={`slot-${slot._id}`}
                      className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer
                                    peer-checked:border-pink-600 peer-checked:text-pink-700 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">{slot.label}</div>
                        <div className="w-full text-gray-500">
                          {timeFormatter(slot.start_time)} -{" "}
                          {timeFormatter(slot.end_time)}
                        </div>
                      </div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"   
 strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                    </label>
                  </li>
                ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
