import ProfileUpdateModal from "./updateModal";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../config";
import { Avatar } from "@mui/material";

const UserDetails = ({ teachers, getAllData }) => {
  const updateProfile = async (e, data) => {
    const s = new FormData(e.target);
    let formData = {
      ...data,
      photoUrl: s.get("photoUrl"),
    };
    const response = await axios.patch(
      baseUrl + "/user/update-profile/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (response.status === 200) {
      toast.success("success", response.data.message);
      getAllData();
    }
  };

  return (
    <div className="flex items-center ml-8 md:ml-0 space-x-4">
      <Avatar
        alt={teachers?.user?.firstName}
        src={
          teachers.googlePhoto
            ? teachers.googlePhoto
            : teachers.photoUrl
            ? baseUrl + "/" + teachers.photoUrl
            : ""
        }
        sx={{ width: 64, height: 64 }}
      />
      <div>
        <h2 className="text-xl font-semibold">
          {teachers?.user?.firstName} {teachers?.user?.lastName}
        </h2>
        <p className="text-gray-600">{teachers?.user?.email}</p>
      </div>
      <ProfileUpdateModal userDetails={teachers} onUpdate={updateProfile} />
    </div>
  );
};

export default UserDetails;
