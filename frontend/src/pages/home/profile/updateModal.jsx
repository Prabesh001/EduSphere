import { useEffect, useState } from "react";

const ProfileUpdateModal = ({ userDetails, onUpdate }) => {
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(e, formData);
    setShowModal(false);
  };

  useEffect(() => {
    setFormData({
      firstName: userDetails.user?.firstName,
      lastName: userDetails.user?.lastName,
      photoUrl: userDetails.user?.photoUrl,
    });
  }, [userDetails]);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Edit
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl text-black font-bold mb-4">Update Profile</h2>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full text-black border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full text-black border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="photoUrl" className="block text-gray-700">
                  Photo URL
                </label>
                <input
                  type="file"
                  id="photoUrl"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="w-full text-black border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-4"
              >
                cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileUpdateModal;
