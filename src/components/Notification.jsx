import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.POSITION.TOP_LEFT
// toast.POSITION.TOP_RIGHT
// toast.POSITION.TOP_CENTER
// toast.POSITION.BOTTOM_LEFT
// toast.POSITION.BOTTOM_RIGHT
// toast.POSITION.BOTTOM_CENTER

const showMessage = ({
  status,
  message,
  position = toast.POSITION.BOTTOM_RIGHT,
}) => {
  switch (status) {
    case "success":
      toast.success(message, { position });
      break;
    case "error":
      toast.error(message, { position });
      break;
    case "info":
      toast.info(message, { position });
      break;
    case "warning":
      toast.warning(message, { position });
      break;
    default:
      toast(message, { position });
      break;
  }
};

const Notification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export { showMessage, Notification };
