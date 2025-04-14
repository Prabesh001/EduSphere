const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Unauthorized Access
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          You are not authorized to view this page.
        </p>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <button
              onClick={() => window.history.back()}
              type="submit"
              className="inline-flex justify-center rounded-md border "
            >
              Back
            </button>
            <button
              onClick={() => (window.location.href = "/login")}
              type="submit"
              className="inline-flex justify-center rounded-md border "
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
