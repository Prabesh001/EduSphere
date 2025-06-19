import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
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

    try {
      const response = await axios.post("http://localhost:3000/login", data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.data.role);

        if (response.data.data.role === "admin") {
          navigate("/dashboard");
        } else if (response.data.data.role === "teacher") {
          navigate("/teacherDashboard");
        } else {
          navigate("/");
        }
        toast.success(response.data.message);
        return;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Please check your email and password!"
      );
    }
  };
  return (
    <div
      id="page-container"
      className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
    >
      {/* Page Content */}
      <main id="page-content" className="flex max-w-full flex-auto flex-col">
        <div className="relative mx-auto flex min-h-dvh w-full max-w-10xl items-center justify-center overflow-hidden p-4 lg:p-8">
          {/* Sign In Section */}
          <section className="w-full max-w-xl py-6">
            {/* Header */}
            <header className="mb-10 text-center">
              <h1 className="mb-2 inline-flex items-center space-x-2 text-2xl font-bold">
                <svg
                  className="hi-mini hi-cube-transparent inline-block size-5 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>EduSphere</span>
              </h1>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Welcome, please sign in to your dashboard
              </h2>
            </header>
            {/* END Header */}

            {/* Sign In Form */}
            <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
              <div className="grow p-5 md:px-16 md:py-12">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
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
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <div className="mb-5 flex items-center justify-between space-x-2">
                      <a
                        href="/forgotPassword"
                        className="inline-block text-sm font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border border-blue-700 bg-blue-700 px-6 py-3 font-semibold leading-6 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400 focus:ring-opacity-50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400 dark:focus:ring-opacity-90"
                    >
                      <svg
                        className="hi-mini hi-arrow-uturn-right inline-block size-5 opacity-50"
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
                      <span>Sign In</span>
                    </button>
                    {/* Divider: With Label */}
                    <div className="my-5 flex items-center">
                      <span
                        aria-hidden="true"
                        className="h-0.5 grow rounded bg-gray-100 dark:bg-gray-700/75"
                      />
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        or sign in with
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-0.5 grow rounded bg-gray-100 dark:bg-gray-700/75"
                      />
                    </div>
                    {/* END Divider: With Label */}
                    <div className="grid grid-cols gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          (window.location.href =
                            "http://localhost:3000/auth/google")
                        }
                        className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                      >
                        <FaGoogle />
                        <span>Google</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="grow bg-gray-50 p-5 text-center text-sm dark:bg-gray-700/50 md:px-16">
                Don’t have an account yet?{" "}
                <a
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Sign up
                </a>
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

export default Login;
