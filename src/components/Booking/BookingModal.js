import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function BookingModal({ isOpen, onClose, children }) {
  const { slots, user, service, employee, slot, setSlot } = useAuth();
  const [bookingError, setBookingError] = useState("");
  const navigate = useNavigate();

  const timeFormatter = (time) => {
    const [hours, minutes] = time.split(":");
    return hours < 12
      ? `${hours}:${minutes} AM`
      : `${hours % 12 || 12}:${minutes} PM`;
  };

  const bookNow = async() => {
    if (!user.email) {
      navigate("/login");
    } else {
      if (slot.label) {
        const btn = document.getElementById("pay-btn");
        btn.innerText = "Processing Payment...";
        btn.disabled = true;

        const trxId = await generateTransactionId();
        const formData = {
          date: new Date().toISOString().split("T")[0],
          email: user.email,
          name: user.name,
          service,
          employee,
          slot,
          trxId,
          status: "pending",
        };

        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5000/booking", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.status) {
              payNow(employee.rate, trxId);
              setBookingError("")
            } else {
              setBookingError(result.message);
            }
            btn.innerText = "Pay Now";
            btn.disabled = false;
          } catch (error) {
            fetchData();
          } finally {
            btn.innerText = "Pay Now";
            btn.disabled = false;
          }
        };
        fetchData();
      }
    }
  };

  const payNow = (amount, trxId) => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/pay/${amount}/${trxId}`);
        const result = await response.json();
        if (result.status) {
          window.location.replace(`${result.payment_link}`);
        } else {
          console.log(result);
        }
      } catch (error) {
        fetchData()
      }
    }
    fetchData()
  }

  async function generateTransactionId (prefix="TX") {
    const timeStamp = Date.now();
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `${prefix}${timeStamp}${random}`;
  }
  return (
    <div
      className={`fixed inset-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto transition-opacity duration-300 ease-in-out
    ${isOpen ? "flex" : "hidden"}`}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg w-96">
        {children}
        <div className="p-4 md:p-5">
          <p className="text-gray-500">Select your desired slot:</p>
          <p className="text-rose-500 text-sm">{bookingError}</p>
          <ul className="space-y-4 my-4 max-h-80 overflow-auto p-2">
            {slots.length > 0 &&
              slots.map((slot) => (
                <li key={slot._id}>
                  <input
                    onChangeCapture={() => {
                      setSlot(slot);
                      setBookingError("")
                    }}
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
                      <div className="w-full text-lg font-semibold">
                        {slot.label}
                      </div>
                      <div className="w-full text-gray-500">
                        {timeFormatter(slot.start_time)} -{" "}
                        {timeFormatter(slot.end_time)}
                      </div>
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>
                </li>
              ))}
          </ul>
          <button
            id="pay-btn"
            onClick={bookNow}
            className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
