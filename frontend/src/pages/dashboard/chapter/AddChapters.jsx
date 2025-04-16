import { useState } from "react";
import { baseUrl } from "../../../config";
import axios from "axios";

const AddChapter = () => {
  const [data, setData] = useState({
    chapterTitle: "",
    chapterDescription: "",
    chapterStatus: "",
    chapterType: "",
    courseId: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${baseUrl}chapter`, data);
  };
  console.log(data);
  return (
    <div
      id="page-container"
      className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
    >
      {/* Page Content */}
      <main id="page-content" className="flex flex-col flex-auto max-w-full">
        <div className="relative flex items-center justify-center w-full p-4 mx-auto overflow-hidden min-h-dvh max-w-10xl lg:p-8">
          {/* Sign In Section */}
          <section className="w-full max-w-xl py-6">
            {/* Header */}

            {/* END Header */}

            {/* Sign In Form */}
            <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-100">
              <div className="p-5 grow md:px-16 md:py-12">
                <form className="space-y-6">
                  <div className="space-y-1">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title
                    </label>
                    <input
                      type="title"
                      id="title"
                      name="chapterTitle"
                      onChange={handleChange}
                      placeholder="Enter your title"
                      className="block w-full px-5 py-3 leading-6 placeholder-gray-500 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Description
                    </label>
                    <input
                      type="description"
                      id="description"
                      name="chapterDescription"
                      onChange={handleChange}
                      placeholder="Enter your description"
                      className="block w-full px-5 py-3 leading-6 placeholder-gray-500 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="video" className="text-sm font-medium">
                      Video
                    </label>
                    <input
                      type="file"
                      id="video"
                      name="video"
                      onChange={handleChange}
                      placeholder="Enter your video"
                      className="block w-full px-5 py-3 leading-6 placeholder-gray-500 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="status" className="text-sm font-medium">
                      status
                    </label>
                    <br></br>
                    <select
                      name="chapterType"
                      id="status"
                      onChange={handleChange}
                    >
                      <option value="published">Published</option>
                      <option value="unpublished">Unpublished</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="type" className="text-sm font-medium">
                      Type
                    </label>
                    <br></br>
                    <select
                      name="chapterStatus"
                      id="status"
                      onChange={handleChange}
                    >
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="type" className="text-sm font-medium">
                      Type
                    </label>
                    <br></br>
                    <select name="courseId" id="status" onChange={handleChange}>
                      <option value="free">ReactJs</option>
                      <option value="premium">NodeJs</option>
                    </select>
                  </div>

                  <div>
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
                      <span>Add Chapters</span>
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

export default AddChapter;
