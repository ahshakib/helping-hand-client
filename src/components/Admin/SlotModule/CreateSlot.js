import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

function CreateSlot() {
  const { setSlots } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => creatingSlot(data);

  const creatingSlot = (data) => {
    const formData = {
      label: data.label,
      start_time: data.start_time,
      end_time: data.end_time
    }
    const btn = document.getElementById("create_slot_btn_admin");
    btn.disabled = true;
    btn.innerText = "Creating Slot...";

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/slot", {
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
              const response = await fetch("http://localhost:5000/slots");
              const result = await response.json();

              if (result.status) {
                setSlots(result.slots);
              } else {
                setSlots([]);
              }
            } catch (error) {
              setSlots([]);
            }
          };
          fetchData();
        } else {
          toast.error(result.message);
        }
        document.getElementById("create_slot_form_admin").reset();
        btn.innerText = "Create Slot";
        btn.disabled = false;
      } catch (error) {
        fetchData();
      }
    };

    fetchData();
  }

  return (
    <form
      id="create_slot_form_admin"
      onSubmit={handleSubmit(onSubmit)}
      className="w-5/6 mx-auto flex items-center content-center px-5 my-5"
    >
      <div className="w-full">
        <div className="my-2">
          <input
            type="text"
            placeholder="Label name"
            autoComplete={`label`}
            className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
            {...register("label", { required: true })}
          />
          {errors.label && (
            <span className="text-rose-500">Label name is required</span>
          )}
        </div>

        <div className="my-2">
          <input
            type="time"
            className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
            {...register("start_time", { required: true })}
          />
          {errors.start_time && (
            <span className="text-rose-500">Start time is required</span>
          )}
        </div>

        <div className="my-2">
          <input
            type="time"
            className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
            {...register("end_time", { required: true })}
          />
          {errors.end_time && (
            <span className="text-rose-500">End time is required</span>
          )}
        </div>

        <button
          id="create_slot_btn_admin"
          className="bg-pink-700 hover:bg-pink-800 text-white w-full py-2 rounded-md"
        >
          Create Slot
        </button>
      </div>
    </form>
  )
}

export default CreateSlot