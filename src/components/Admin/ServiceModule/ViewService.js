import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { toast } from 'react-toastify';

function ViewService() {
  const { services, setServices } = useAuth()
  const isUrl = (path) => {
    try {
      const url = new URL(path);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/service/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.status) {
        toast.success(result.message);
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5000/services");
            const result = await response.json();

            if (result.status) {
              setServices(result.services);
            } else {
              setServices([]);
            }
          } catch (error) {
            setServices([]);
          }
        };
        fetchData();
      }
    } catch (error) {
      toast.error(error.message);
    }
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
              Image
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
              Category
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left border-r border-gray-300">
              Name
            </th>
            <th className="text-sm font-medium text-gray-900 p-3 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 &&
            services.map((service, index) => (
              <tr
                key={service._id}
                className="odd:bg-gray-200 even:bg-gray-50 border-b"
              >
                <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap border-r border-gray-300">
                  {index + 1}
                </td>
                <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap capitalize border-r border-gray-300">
                  {
                    service.image ? (
                      <img src={
                        isUrl(service.image) ? service.image : `http://localhost:5000${service.image}`
                      } alt={service.name} className="w-10 h-10 object-cover rounded" />
                    ) : ('No Image')
                  }
                </td>
                <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap capitalize border-r border-gray-300">
                  {service.category}
                </td>
                <td className="text-sm text-gray-900 font-normal p-3 whitespace-nowrap capitalize border-r border-gray-300">
                  {service.name}
                </td>
                <td
                  onClick={() => handleDelete(service._id)}
                  className="hover:cursor-pointer text-sm text-gray-900 font-normal p-3 whitespace-nowrap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 100 100"
                  >
                    <path
                      fill="#f37e98"
                      d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"
                    ></path>
                    <path
                      fill="#f15b6c"
                      d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"
                    ></path>
                    <path
                      fill="#1f212b"
                      d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"
                    ></path>
                    <path
                      fill="#1f212b"
                      d="M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z"
                    ></path>
                    <path
                      fill="#1f212b"
                      d="M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z"
                    ></path>
                    <path
                      fill="#1f212b"
                      d="M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z"
                    ></path>
                  </svg>
                  {/* Update button will */}

                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewService