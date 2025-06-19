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
              EduSphere
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
