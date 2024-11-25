import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function CreateEmployee() {
  const { setEmployees, services, users } = useAuth();
  const [useUrl, setUseUrl] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => creatingEmployee(data);

  const handleImageUpload = async (imageFile) => {
    try {
      const imageData = new FormData();
      imageData.set('key', 'ca323d531bda9abe4e6548c42ad76a50')
      imageData.append('image', imageFile)

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: imageData
      })
      const data = await response.json()
      const url = data.data.display_url
      return url
    } catch (error) {
      toast.error(error.message)
      return null
    }
  }

  const handleServiceAdd = (service) => {
    if (!selectedServices.includes(service)) {
      setSelectedServices([...selectedServices, service ])
    } else {
      setSelectedServices(selectedServices);
    }
  }

  const handleServiceRemove = (service) => {
    setSelectedServices(selectedServices.filter(s => s !== service));
  }

  const creatingEmployee = async (data) => {
    let imageUrl = null;

    if (!useUrl) {
        imageUrl = await handleImageUpload(data.image[0]);
        if (!imageUrl) {
            toast.error("Failed to upload image.");
            return;
        }
    } else {
        imageUrl = data.imageUrl;
    }
    const formData = {
      name: data.name,
      bio: data.bio,
      location: data.location,
      rate: data.rate,
      details: data.details,
      services: selectedServices,
      image: imageUrl
    }

    const btn = document.getElementById("create_employee_btn_admin");
    btn.disabled = true;
    btn.innerText = "Creating Employee...";

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/employee", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.status) {
                toast.success(result.message);
                const fetchData = async () => {
                    try {
                        const response = await fetch("http://localhost:5000/employees");
                        const result = await response.json();

                        if (result.status) {
                            setEmployees(result.employees);
                        } else {
                          setEmployees([]);
                        }
                    } catch (error) {
                      setEmployees([]);
                    }
                };
                fetchData();
            } else {
                toast.error(result.message);
            }
            document.getElementById("create_employee_form_admin").reset();
            btn.innerText = "Create Employee";
            btn.disabled = false;
            setSelectedServices([])
        } catch (error) {
            fetchData();
        } finally {
            document.getElementById("create_employee_form_admin").reset();
            btn.innerText = "Create Employee";
            btn.disabled = false;
        }
    };

    fetchData();
}


  return (
    <div>
      <div className='p-2'>
        {
          selectedServices.length > 0 &&
            <div className='bg-white p-2 rounded shadow-md flex flex-wrap gap-1 items-center'>
              <span>Selected Services:</span>
              {
                selectedServices.map((service) => 
                  <p onClick={() => handleServiceRemove(service)} className='bg-pink-900 text-white text-xs py-2 px-3 rounded-full truncate cursor-pointer flex items-center'>{service}</p>)
              }
            </div>
        }
      </div>
      <form
            id="create_employee_form_admin"
            onSubmit={handleSubmit(onSubmit)}
            className="w-5/6 mx-auto flex items-center content-center px-5 my-5"
        >
            <div className="w-full">
                <select
                    {...register("service", { required: true })}
                    onChangeCapture={(e) => handleServiceAdd(e.target.value)}
                    defaultValue={``}
                    className="p-2 border-2 border-pink-700 focus:outline-pink-400 rounded-md w-full mb-2"
                >
                    <option value="" disabled>
                        Select Service
                    </option>
                    {
                        services.map(service =>
                            <option key={service._id} value={service.name}>{service.name}</option>
                        )
                    }
                </select>
                {errors.service && <span className="text-rose-500">Service is required</span>}

                <select
                    {...register("name", { required: true })}
                    defaultValue={``}
                    className="p-2 border-2 border-pink-700 focus:outline-pink-400 rounded-md w-full mb-2"
                >
                    <option value="" disabled>
                        Select Employe
                    </option>
                    {
                        users.filter(user => user.role === 'employee').map(u =>
                            <option key={u._id} value={u.name}>{u.name}</option>
                        )
                    }
                </select>
                {errors.name && <span className="text-rose-500">Employee name is required</span>}

                <div className="my-2">
                    <input
                        type="text"
                        placeholder="Bio..."
                        autoComplete={`bio`}
                        className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
                        {...register("bio", { required: true })}
                    />
                    {errors.bio && (
                        <span className="text-rose-500">Bio is required</span>
                    )}
                </div>

                <div className="my-2">
                    <input
                        type="text"
                        placeholder="Location..."
                        autoComplete={`location`}
                        className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
                        {...register("location", { required: true })}
                    />
                    {errors.location && (
                        <span className="text-rose-500">Location is required</span>
                    )}
                </div>

                <div className="my-2">
                    <input
                        type="number"
                        placeholder="Rate..."
                        className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
                        {...register("rate", { required: true })}
                    />
                    {errors.rate && (
                        <span className="text-rose-500">Rate is required</span>
                    )}
                </div>

                <div className="my-2">
                    <textarea
                        type="text"
                        placeholder="Employee details..."
                        autoComplete={`details`}
                        className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
                        {...register("details", { required: true })}
                    />
                    {errors.details && (
                        <span className="text-rose-500">Details is required</span>
                    )}
                </div>

                <div className="my-2">
                    <label className="flex items-center gap-2 mb-2">
                        <input
                            type="checkbox"
                            checked={useUrl}
                            onChange={(e) => {
                                setUseUrl(e.target.checked);
                                if (e.target.checked) {
                                    setValue('image', null); // Clear file input if switching to URL
                                }
                            }}
                            className="mr-2 h-4 w-4 text-pink-600 focus:ring-pink-500 border-pink-600 rounded"
                        />
                        <span className="text-sm font-medium text-gray-900">Use Image URL</span>
                    </label>
                </div>

                {useUrl ? (
                    <div className="my-2">
                        <input
                            {...register('imageUrl', {
                                required: 'Image URL is required',
                                pattern: {
                                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                                    message: 'Invalid URL format',
                                },
                            })}
                            type="text"
                            className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
                            placeholder='Image URL'
                        />
                        {errors.imageUrl && <p>{errors.imageUrl.message}</p>}
                    </div>
                ) : (
                    <div className='my-2'>
                        <input
                            {...register('image', { required: 'Image file is required' })}
                            type="file"
                            accept='image/*'
                            className='block w-full bg-pink-100 rounded-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-700 hover:file:bg-pink-800 file:text-white hover:file:cursor-pointer'
                        />
                        {errors.image && <p>{errors.image.message}</p>}
                    </div>
                )}


                <button
                    id="create_employee_btn_admin"
                    className="bg-pink-700 hover:bg-pink-800 text-white w-full py-2 rounded-md"
                >
                    Create Employee
                </button>
            </div>
        </form>
    </div>
  )
}

export default CreateEmployee