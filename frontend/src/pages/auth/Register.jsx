import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (Object.values(data).some((d) => d.trim() === "")) {
      toast.error("Cannot register with empty fields!");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3000/register", data);
      if (response.status === 200) {
        toast.success("You Registered Successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Registration failed!");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      {/* Checkout Section: Simple Box */}
      <div className="bg-gray-100 min-h-screen dark:bg-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          {/* Box */}
          <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
            <div className="mx-auto w-full max-w-lg grow p-5">
              {/* Heading */}
              <div className="mt-5 text-center">
                <h1 className="mb-4 text-2xl font-bold">Register Here</h1>
              </div>
              {/* END Heading */}

              {/* Checkout Form */}
              <div className="space-y-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-6 rounded border bg-gray-50 p-4 dark:border-gray-700/75 dark:bg-gray-900/50">
                    <div className="space-y-1">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <input
                        type="text"
                        id="vat_id"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <input
                        type="text"
                        id="vat_id"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <input
                        type="password"
                        id="vat_id"
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border border-blue-700 bg-blue-700 px-6 py-3 font-semibold leading-6 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400 focus:ring-opacity-50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400 dark:focus:ring-opacity-90"
                  >
                    <span>{loading ? "Loading..." : "Register"}</span>
                  </button>
                </form>
              </div>
              {/* END Checkout Form */}

              {/* Footer */}
              <div className="my-5 text-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <a
                    className="inline-block text-sm font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                    href="/login"
                  >
                    {" "}
                    Sign In
                  </a>
                </p>
              </div>
              {/* Footer */}
            </div>
          </div>
          {/* END Box */}
        </div>
      </div>
      {/* END Checkout Section: Simple Box */}
    </>
  );
};

export default Register;
