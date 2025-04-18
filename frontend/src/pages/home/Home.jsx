import Footer from "../../components/Footer";
import CourseList from "./CourseList";

export default function Home() {
  return (
    <>
      {/* Hero Content */}
      <div className="container relative flex flex-col px-4 py-16 mx-auto space-y-10 text-center lg:flex-row lg:space-y-0 lg:px-8 lg:py-32 lg:text-left xl:max-w-7xl">
        <div className="lg:flex lg:w-1/2 lg:items-center">
          <div>
            <div className="inline-flex px-2 py-1 mb-2 text-sm font-medium leading-4 text-gray-800 bg-gray-100 border border-gray-200 rounded dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-200">
              Learn With Us
            </div>
            <h1 className="mb-4 text-4xl font-black text-black dark:text-white">
              Edusphere
              <span className="ml-2 text-blue-600 dark:text-blue-500">
                Nepal
              </span>
            </h1>
            <h2 className="text-xl mb-8 font-medium leading-relaxed text-gray-700 dark:text-gray-300">
              &quot;Unlock Your Learning Potential with EduSphere! We are
              committed to delivering exceptional IT education, empowering
              students to master skills, achieve certifications, and thrive in
              their careers. Join us and transform your future today.&quot;
            </h2>
            {/* <div className="flex flex-col justify-center pt-10 pb-16 space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0 lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center justify-center space-x-2 rounded-lg border border-blue-700 bg-blue-700 px-7 py-3.5 font-semibold leading-6 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400 focus:ring-opacity-50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400 dark:focus:ring-opacity-90"
              >
                <svg
                  className="inline-block opacity-75 hi-mini hi-arrow-down-tray size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                <span>Download for free</span>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-7 py-3.5 font-semibold leading-6 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
              >
                <span>Learn more</span>
              </a>
            </div> */}
          </div>
        </div>
        <div className="lg:ml-16 lg:flex lg:w-1/2 lg:items-center lg:justify-center">
          <div className="relative mx-5 lg:w-96">
            <div className="absolute top-0 left-0 -mt-16 -ml-20 border border-blue-200 rounded-full bg-tranparent size-40 dark:border-blue-900 lg:size-72" />
            <div className="absolute top-0 left-0 -mt-20 border border-blue-100 rounded-full bg-tranparent -ml-14 size-40 dark:border-blue-950 lg:size-72" />
            <div className="absolute bottom-0 right-0 -mb-16 -mr-20 border border-blue-200 rounded-full bg-tranparent size-40 dark:border-blue-900 lg:size-72" />
            <div className="absolute bottom-0 right-0 -mb-20 border border-blue-100 rounded-full bg-tranparent -mr-14 size-40 dark:border-blue-950 lg:size-72" />
            <div className="absolute inset-0 -m-6 bg-gray-200 -rotate-2 rounded-xl dark:bg-gray-800" />
            <div className="absolute inset-0 -m-6 bg-blue-800 bg-opacity-75 shadow-inner rotate-1 rounded-xl dark:bg-blue-900 dark:bg-opacity-75" />
            <img
              src="https://cdn.tailkit.com/media/placeholders/photo-RSCirJ70NDM-800x1000.jpg"
              className="relative mx-auto rounded-lg shadow-lg"
              alt="Hero Image"
            />
          </div>
        </div>
      </div>
      <CourseList />

      <Footer />
    </>
  );
}
