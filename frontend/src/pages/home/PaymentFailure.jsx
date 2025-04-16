import { XCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PaymentFailurePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const encodedData = searchParams.get("data");

  let decoded = {};
  try {
    decoded = encodedData ? JSON.parse(atob(encodedData)) : {};
  } catch (error) {
    console.error("Failed to decode payment failure data:", error);
  }

  const userInfo = JSON.parse(localStorage.getItem("userDetails"));
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const clearPaymentData = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userDetails");
  };

  useEffect(() => {
    toast.error("Payment Failure")
    const timeout = setTimeout(() => {
      clearPaymentData();
      navigate(userInfo?.endpoint || "/");
    }, 30000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-red-200 bg-white shadow-lg">
        {/* Header */}
        <div className="px-6 py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-red-700">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            Sorry {userInfo?.name || "User"}, your payment could not be processed.
          </p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="mb-4 rounded-lg bg-red-50 p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-gray-500">Transaction ID:</div>
              <div className="font-medium text-gray-500">
                {decoded.transaction_uuid || "N/A"}
              </div>
              <div className="text-gray-500">Amount:</div>
              <div className="font-medium text-gray-500">
                Rs. {decoded.total_amount || "N/A"}
              </div>
              <div className="text-gray-500">Date:</div>
              <div className="font-medium text-gray-500">{currentDate}</div>
              <div className="text-gray-500">Status:</div>
              <div className="font-medium text-red-600">Failed</div>
            </div>
          </div>

          <div className="mb-6 rounded-lg border border-red-200 bg-white p-4">
            <h3 className="mb-2 font-medium text-gray-900">
              Possible reasons for failure:
            </h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
              <li>Insufficient balance in your payment account</li>
              <li>Transaction timeout</li>
              <li>Network connectivity issues</li>
              <li>Payment service disruption</li>
              <li>Invalid payment details</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Link
              onClick={clearPaymentData}
              to={userInfo?.endpoint || "/"}
              className="block w-full rounded-md bg-red-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-red-700"
            >
              Go Back
            </Link>
            <Link
              onClick={clearPaymentData}
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
