import React from "react";
import useAuth from "../../hooks/useAuth";

function PaymentHistory() {
  const { bookings } = useAuth();
  return (
    <div className="overflow-auto my-5 max-h-80 p-2">
      <table className="min-w-full border relative">
        <thead className="bg-white border-b sticky -top-3">
          <tr>
            <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
              #
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
              Transaction ID
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
              Service
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
              Amount
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 &&
            bookings.map((booking, index) => (
              <tr
                key={booking._id}
                className="odd:bg-gray-200 even:bg-gray-50 border-b"
              >
                <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap border-r border-gray-300">
                  {index + 1}
                </td>
                <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap capitalize border-r border-gray-300">
                  {booking.trxId}
                </td>
                <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap capitalize border-r border-gray-300">
                  {booking.service.name}
                </td>
                <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap capitalize border-r border-gray-300">
                  ৳ {Number(booking.employee.rate).toLocaleString()}
                </td>
                <td
                  className={`text-sm ${
                    booking.status === "success" && "text-green-700"
                  } ${booking.status === "fail" && "text-rose-700"} ${
                    booking.status === "pending" && "text-yellow-500"
                  } font-bold p-3 whitespace-nowrap capitalize border-r border-gray-300`}
                >
                  {booking.status}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentHistory;
