import axios from "axios";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../config";

export default function PaymentSuccessPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userDetails = searchParams.get("data");
  const decoded = JSON.parse(atob(userDetails));

  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const userInfo = JSON.parse(localStorage.getItem("userDetails"));

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleEnroll = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.get(
          baseUrl + "/user/enroll/" + userInfo?.courseId,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Enrollment failed");
      }
    }
  };

  const handleRedirect = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
    navigate(userInfo.endpoint || "/");
  };

  useEffect(() => {
    handleEnroll();
    toast.success("Payment Sucessful!");

    const timeout = setTimeout(() => {
      handleRedirect();
    }, 30000);

    return () => clearInterval(timeout);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-green-200 bg-white shadow-lg">
        {/* Header */}
        <div className="px-6 py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-green-700">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you {user || userInfo.name || "User"}, your payment has been
            processed.
          </p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="mb-6 rounded-lg bg-green-50 p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {/* {user && (
                <>
                  <div className="text-gray-500">Customer Name:</div>
                  <div className="font-medium text-gray-500">{user.name}</div>
                </>
              )} */}
              <div className="text-gray-500">Transaction ID:</div>
              <div className="font-medium text-gray-500">
                {decoded.transaction_uuid}
              </div>
              <div className="text-gray-500">Amount:</div>
              <div className="font-medium text-gray-500">
                Rs. {decoded.total_amount}
              </div>
              <div className="text-gray-500">Date:</div>
              <div className="font-medium text-gray-500">{currentDate}</div>
              <div className="text-gray-500">Status:</div>
              <div className="font-medium text-green-600">{decoded.status}</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Link
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("userInfo");
              }}
              to={userInfo.courseId || "/"}
              className="block w-full rounded-md bg-green-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-green-700"
            >
              Go Back
            </Link>
            <Link
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("userInfo");
              }}
              to="/"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
