import Swal from "sweetalert2";

const Alert = {
  showSuccess: (message) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
    });
  },
  showError: (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  },
  showInfo: (message) => {
    Swal.fire({
      icon: "info",
      title: "Info",
      text: message,
    });
  },
  showWarning: (message) => {
    Swal.fire({
      icon: "warning",
      title: "Warning",
      text: message,
    });
  },
};

export default Alert;
