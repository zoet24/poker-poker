import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleToastSuccess = (message: string) => {
  toast.success(message);
};

export const handleToastError = (message: string) => {
  toast.error(message);
};
