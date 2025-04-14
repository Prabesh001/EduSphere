import  { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../config";

const TeacherListTable = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const getAllData = async () => {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem('token')
            }
        };
        try {
            const response = await axios.get(baseUrl + "/get-all-teacher", config);
            if (response.status === 200) {
                setTeachers(response.data);
            }
        } catch (error) {
            console.error("Error fetching teachers:", error.response.data);
        }
    };

    const onDelete = async (teacherId) => {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem('token')
            }
        };
        try {
            const response = await axios.delete(baseUrl + `/delete-teacher/${teacherId}`, config);
            if (response.status === 200) {
                getAllData(); // Fetch updated data after deletion
            }
        } catch (error) {
            console.error("Error deleting teacher:", error.response.data);
        }
    };

    const handleEdit = (teacher) => {
        setSelectedTeacher(teacher);
        setFormData({
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email
        });
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedTeacher(null);
        setFormData({
            firstName: '',
            lastName: '',
            email: ''
        });
    };

    useEffect(() => {
        getAllData();
    }, []);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem('token')
            }
        };
        try {
            const response = await axios.patch(baseUrl + `/update-teacher/${selectedTeacher.id}`, formData, config);
            if (response.status === 200) {
                setIsUpdateModalOpen(false);
                getAllData();
            }
        } catch (error) {
            console.error("Error updating teacher:", error.response.data);
        }
    };

    return (
        <div className="overflow-x-auto pt-10">
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">First Name</th>
                        <th className="border px-4 py-2">Last Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.id}>
                            <td className="border px-4 py-2">{teacher.id}</td>
                            <td className="border px-4 py-2">{teacher.firstName}</td>
                            <td className="border px-4 py-2">{teacher.lastName}</td>
                        <td className="border px-4 py-2">{teacher.email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => handleEdit(teacher)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => onDelete(teacher.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update Modal */}
            {selectedTeacher &&
                <div className={`fixed z-10 inset-0 overflow-y-auto ${isUpdateModalOpen ? 'block' : 'hidden'}`}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleFormSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="mb-4">
                                        <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleFormChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleFormChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                        <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">Update Teacher</button>
                                    <button type="button" onClick={handleCloseUpdateModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default TeacherListTable;
