import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../config";
import {  Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
const AddCategory = () => {
  const nav = useNavigate();

  const [category, setCategory] = useState("");
  // const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    let formData = {
      categoryName: category,
    };

    try {
      const response = await axios.post(
        baseUrl + "/add-category",
        formData,
        config
      );
      if (response.status === 200) {
        toast.success("success", response.data.message);
        nav("/dashboard/categories");
      }
      console.log("Teacher added successfully:", response.data);
      // You can show a success message or redirect the user to another page
    } catch (error) {
      console.error("Error adding teacher:", error.response.data);
      // You can show an error message to the user
    }
  };
  return (
    <div
      id="page-container"
      className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-10"
    >
       <div className="flex justify-between pt-10">
        <h1 className="text-2xl font-semibold mb-4">Add Category Form</h1>

        <Link
          to="/dashboard/categories"
          className="text-blue-500 hover:underline"
        >
          View All Categories
        </Link>
      </div>
      <main id="page-content" className="flex flex-col flex-auto max-w-full">
        <div className="relative flex items-center justify-center w-full p-4 mx-auto overflow-hidden min-h-dvh max-w-10xl lg:p-8">
          {/* Sign In Section */}
          <section className="w-full max-w-xl py-6">
            {/* Header */}

            {/* END Header */}

            {/* Sign In Form */}
            <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-100">
              <div className="p-5 grow md:px-16 md:py-12">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <label htmlFor="category" className="text-sm font-medium">
                      category
                    </label>
                    <input
                      type="category"
                      id="category"
                      name="category"
                      placeholder="Enter your category"
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full px-5 py-3 leading-6 placeholder-gray-500 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-5 space-x-2">
                      {/* <label className="flex items-center"> */}
                      {/* <input
                        type="checkbox"
                        id="remember_me"
                        name="remember_me"
                        className="text-blue-500 border border-gray-200 rounded size-4 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900 dark:checked:border-transparent dark:checked:bg-blue-500 dark:focus:border-blue-500"
                      />
                      <span className="ml-2 text-sm">Remember me</span>
                    </label> */}
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold leading-6 text-white bg-blue-700 border border-blue-700 rounded-lg hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400 focus:ring-opacity-50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400 dark:focus:ring-opacity-90"
                    >
                      <svg
                        className="inline-block opacity-50 hi-mini hi-arrow-uturn-right size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Add Category</span>
                    </button>
                    {/* Divider: With Label */}

                    {/* END Divider: With Label */}
                  </div>
                </form>
              </div>
            </div>
            {/* END Sign In Form */}

            {/* END Footer */}
          </section>
          {/* END Sign In Section */}
        </div>
      </main>
      {/* END Page Content */}
    </div>
  );
};

export default AddCategory;
