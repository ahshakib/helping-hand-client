import React from 'react'
import useAuth from '../../hooks/useAuth';

function ViewAllEmployeeAppointments() {
    const { employeePayments } = useAuth();

    const timeFormatter = (time) => {
      const [hours, minutes] = time.split(":");
      return hours < 12
        ? `${hours}:${minutes} AM`
        : `${hours % 12 || 12}:${minutes} PM`;
    };
    return (
      <div className="overflow-auto my-5 max-h-80 p-2">
        <table className="min-w-full border relative">
          <thead className="bg-white border-b sticky -top-3">
            <tr>
              <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
                #
              </th>
              <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
                Date
              </th>
              <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
                User Name
              </th>
              <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
                User Email
              </th>
              <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
                Service
              </th>
              <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
                Slot
              </th>
              <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {employeePayments.length > 0 &&
              employeePayments.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="odd:bg-gray-200 even:bg-gray-50 border-b"
                >
                  <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap border-r border-gray-300">
                    {index + 1}
                  </td>
                  <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap capitalize border-r border-gray-300">
                    {booking.date}
                  </td>
                  <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap capitalize border-r border-gray-300">
                    {booking.name}
                  </td>
                  <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap border-r border-gray-300">
                    {booking.email}
                  </td>
                  <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap border-r border-gray-300">
                    {booking.service.name}
                  </td>
                  <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap capitalize border-r border-gray-300">
                    {booking.slot.label}
                  </td>
                  <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap capitalize border-r border-gray-300">
                    {timeFormatter(booking.slot.start_time)} -{" "}
                    {timeFormatter(booking.slot.end_time)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
}

export default ViewAllEmployeeAppointments