import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function CreateCategory() {
  const { setCategories } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => createCategory(data);

  const createCategory = (data) => {
    const formData = {
      name: data.name
    }
    const btn = document.getElementById("create_category_btn_admin");
    btn.disabled = true;
    btn.innerText = "Creating Category...";

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/category", {
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
              const response = await fetch("http://localhost:5000/categories");
              const result = await response.json();

              if (result.status) {
                setCategories(result.categories);
              } else {
                setCategories([]);
              }
            } catch (error) {
              setCategories([]);
            }
          };
          fetchData();
        } else {
          toast.error(result.message);
        }
        document.getElementById("create_category_form_admin").reset();
        btn.innerText = "Create Category";
        btn.disabled = false;
      } catch (error) {
        fetchData();
      }
    };

    fetchData();
  }
  return (
    <form
      id="create_category_form_admin"
      onSubmit={handleSubmit(onSubmit)}
      className="w-5/6 mx-auto flex items-center content-center px-5 my-5"
    >
      <div className="w-full">
        <div className="my-2">
          <input
            type="text"
            placeholder="Category name"
            autoComplete={`name`}
            className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-rose-500">Name is required</span>
          )}
        </div>

        <button
          id="create_category_btn_admin"
          className="bg-pink-700 hover:bg-pink-800 text-white w-full py-2 rounded-md"
        >
          Create Category
        </button>
      </div>
    </form>
  )
}

export default CreateCategory