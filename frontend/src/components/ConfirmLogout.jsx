import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";

export default function ConfirmLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .react-confirm-alert-overlay {
        background: #0000008c !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleClickOpen = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white p-6 rounded-lg shadow-xl border max-w-sm mx-auto text-center">
            <h1 className="text-xl font-bold text-gray-800 mb-3">Shikshyalaya</h1>
            <p className="text-gray-600 mb-5">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  handleLogout();
                  onClose();
                }}
                className="px-4 py-2 min-w-[80px] bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 min-w-[80px] bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="w-full px-4 py-2 cursor-pointer" onClick={handleClickOpen}>
      Logout
    </div>
  );
}
