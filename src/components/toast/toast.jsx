import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Success toast
export const showSuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
};

// ✅ Error toast
export const showError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
};

// ✅ Info toast
export const showInfo = (message) => {
    toast.info(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
};

// ✅ Warning toast
export const showWarning = (message) => {
    toast.warning(message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
};

// ✅ Custom toast with dynamic type
export const showToast = (message, type = 'success') => {
    const toastTypes = {
        success: toast.success,
        error: toast.error,
        info: toast.info,
        warning: toast.warning,
    };
    
    const toastFunction = toastTypes[type] || toast.success;
    toastFunction(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
};