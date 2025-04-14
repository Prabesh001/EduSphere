import { useEffect, useState } from "react";
import CoursesTabs from "./profileTabs";
import UserDetails from "./userDetails";
import { baseUrl } from "../../../config";
import axios from "axios";


const UserProfilePage = () => {
  const [teachers, setTeachers] = useState({});
  const [enrolled, setEnrolled] = useState([]);


  const getAllData = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/user/profile", config);
      if (response.status === 200) {
        setTeachers(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  };
  const getAllDataEnroll = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/user/enrolled-course", config);
      if (response.status === 200) {
        setEnrolled(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  };

  useEffect(() => {
    getAllData();
    getAllDataEnroll()
  }, []);

  return (
    <div className="container mx-auto mt-8 p-6">
      <div className="flex flex-col gap-x-4 gap-y-8">
        {/* User Details */}
        <div className="justify-self-start">
          <UserDetails teachers={teachers} getAllData={getAllData} />
        </div>

        {/* Courses Tabs */}
        <div className="lg:w-2/3">
          <CoursesTabs courses={enrolled.enrollments} />
          {/* Content for enrolled/completed courses will go here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
