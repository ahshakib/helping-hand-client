import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function CreateService() {
    const { setServices, categories } = useAuth();
    const [useUrl, setUseUrl] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false); // To handle AI generation state
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => creatingService(data);

    const convertToPlainText = (text) => {
        return text
          .replace(/[*#_`]+/g, '') // Remove Markdown symbols (*, **, _, #, `)
          .replace(/^\s*\n/gm, '') // Remove empty lines
          .replace(/\n+/g, '\n');  // Collapse multiple newlines to a single one
      };

    const generatingDetails = async (serviceName) => {
        try {
            setLoadingAI(true); // Start AI loading state
            const response = await fetch("http://localhost:5000/service/generate-details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ serviceName }),
            });

            const result = await response.json();
            if (result.details) {
                setValue("details", convertToPlainText(result.details)); // Populate the "details" field
                toast.success("Service details generated successfully!");
            } else {
                toast.error(result.message || "Failed to generate service details.");
            }
        } catch (error) {
            toast.error("Error generating service details.");
        } finally {
            setLoadingAI(false); // End AI loading state
        }
    };

    const creatingService = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('details', data.details);

        if (useUrl) {
            formData.append('image', data.imageUrl);
        } else {
            formData.append('image', data.image[0]);
        }

        const btn = document.getElementById("create_service_btn_admin");
        btn.disabled = true;
        btn.innerText = "Creating Service...";

        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/service", {
                    method: "POST",
                    body: formData,
                });

                const result = await response.json();

                if (result.status) {
                    toast.success(result.message);
                    const fetchAllServices = async () => {
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
                    fetchAllServices();
                } else {
                    toast.error(result.message);
                }
                document.getElementById("create_service_form_admin").reset();
                btn.innerText = "Create Service";
                btn.disabled = false;
            } catch (error) {
                toast.error("Error creating service.");
            } finally {
                btn.innerText = "Create Service";
                btn.disabled = false;
            }
        };

        fetchData();
    };

    return (
        <form
            id="create_service_form_admin"
            onSubmit={handleSubmit(onSubmit)}
            className="w-5/6 mx-auto flex items-center content-center px-5 my-5"
        >
            <div className="w-full">
                <select
                    {...register("category", { required: true })}
                    defaultValue=""
                    className="p-2 border-2 border-pink-700 focus:outline-pink-400 rounded-md w-full mb-2"
                >
                    <option value="" disabled>
                        Select Category
                    </option>
                    {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.category && <span className="text-rose-500">Category is required</span>}

                <div className="my-2">
                    <input
                        type="text"
                        placeholder="Service name"
                        autoComplete="name"
                        className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
                        {...register("name", { required: true })}
                        onBlur={(e) => {
                            const serviceName = e.target.value.trim();
                            if (serviceName && !loadingAI) {
                                generatingDetails(serviceName);
                            }
                        }}
                    />
                    {errors.name && <span className="text-rose-500">Name is required</span>}
                </div>

                <div className="my-2">
                    <textarea
                        type="text"
                        placeholder="Service details..."
                        autoComplete="details"
                        className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
                        {...register("details", { required: true })}
                    />
                    {errors.details && <span className="text-rose-500">Details are required</span>}
                </div>
                {loadingAI && (
                    <div className="text-center text-sm text-gray-600 my-2 animate-pulse flex justify-center items-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" fill="currentColor" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Generating service details...
                    </div>
                )}

                <div className="my-2">
                    <label className="flex items-center gap-2 mb-2">
                        <input
                            type="checkbox"
                            checked={useUrl}
                            onChange={(e) => {
                                setUseUrl(e.target.checked);
                                if (e.target.checked) {
                                    setValue("image", null); // Clear file input if switching to URL
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
                            {...register("imageUrl", {
                                required: "Image URL is required",
                                pattern: {
                                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                                    message: "Invalid URL format",
                                },
                            })}
                            type="text"
                            className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
                            placeholder="Image URL"
                        />
                        {errors.imageUrl && <p>{errors.imageUrl.message}</p>}
                    </div>
                ) : (
                    <div className="my-2">
                        <input
                            {...register("image", { required: "Image file is required" })}
                            type="file"
                            accept="image/*"
                            className="block w-full bg-pink-100 rounded-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-700 hover:file:bg-pink-800 file:text-white hover:file:cursor-pointer"
                        />
                        {errors.image && <p>{errors.image.message}</p>}
                    </div>
                )}


                <button
                    id="create_service_btn_admin"
                    className="bg-pink-700 hover:bg-pink-800 text-white w-full py-2 rounded-md"
                >
                    Create Service
                </button>
            </div>
        </form>
    );
}

export default CreateService;
