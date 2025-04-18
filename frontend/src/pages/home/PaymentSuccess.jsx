import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../config";
import axios from "axios";

export default function PaymentSuccessPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userDetails = searchParams.get("data");

  let decoded = {};
  try {
    if (userDetails) {
      decoded = JSON.parse(atob(userDetails));
    } else {
      throw new Error("No payment data provided");
    }
  } catch (err) {
    console.error("Failed to decode payment data", err);
    toast.error("Invalid payment data");
    decoded = {};
  }

  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userInfo = JSON.parse(localStorage.getItem("userDetails") || "{}");

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleEnroll = async () => {
    const id = userInfo?.endPoint;
    const token = localStorage.getItem("token");

    if (token && id) {
      try {
        const response = await axios.get(`${baseUrl}/user/enroll/${id}`, {
          headers: { Authorization: token },
        });
        toast.success(response.data.message);
      } catch (error) {
        console.error(error.response?.data?.message || "Enrollment failed");
      }
    }
  };

  useEffect(() => {
    let didRun = false;

    if (!didRun) {
      handleEnroll();
      didRun = true;
    }

    const timeout = setTimeout(() => {
      handleRedirect();
    }, 30000);

    return () => {
      didRun = true;
      clearTimeout(timeout);
    };
  }, []);

  const handleRedirect = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
    navigate(`/course/${userInfo?.endPoint}` || "/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-green-200 bg-white shadow-lg">
        <div className="px-6 py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-green-700">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you {user || userInfo?.name || "User"}, your payment has been
            processed.
          </p>
        </div>

        <div className="px-6 pb-6">
          <div className="mb-6 rounded-lg bg-green-50 p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-gray-500">Transaction ID:</div>
              <div className="font-medium text-gray-500">
                {decoded?.transaction_uuid || "ES00123456"}
              </div>

              <div className="text-gray-500">Amount:</div>
              <div className="font-medium text-gray-500">
                Rs. {decoded?.total_amount || userInfo?.price || "N/A"}
              </div>

              <div className="text-gray-500">Date:</div>
              <div className="font-medium text-gray-500">{currentDate}</div>

              <div className="text-gray-500">Status:</div>
              <div className="font-medium text-green-600">
                COMPLETED
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div
              onClick={handleRedirect}
              className="block w-full rounded-md bg-green-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-green-700"
            >
              Go Back
            </div>
            <div
              onClick={handleRedirect}
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Return to Home
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
