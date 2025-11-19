import toast from "react-hot-toast";
import { FaRegCircleCheck } from "react-icons/fa6";
import InfoCircle from "~/assets/svg/icons/info-circle";

class ToastClass {
  success(message: string) {
    toast.success(message, {
      icon: <FaRegCircleCheck size={16} />,
      position: "top-left",
      style: {
        // borderLeftWidth: "4px",
        // borderLeftColor: "#009951",
        padding: "12px 12px",
        color: "#27AE60",
        background: "#E6F0EC",
        borderRadius: "8px",
        fontWeight: "500",
        width: "auto",
        height: "auto",
        textAlign: "left",
        fontSize: "14px",
        // minWidth: '300px'
      },
    });
  }

  error(message: string) {
    toast.error(message, {
      icon: <InfoCircle className="text-(--color-error-text)" />,
      position: "top-left",
      style: {
        padding: "12px 12px",
        color: "#D92D20",
        background: "#FEF3F2",
        borderRadius: "8px",
        fontWeight: "600",
        width: "auto",
        height: "auto",
        textAlign: "left",
        fontSize: "12px",
      },
    });
  }

  info(message: string) {
    toast.success(message, {
      icon: null,
      position: "top-left",
      style: {
        borderLeftWidth: "4px",
        borderLeftColor: "#009951",
        padding: "12px 12px",
        color: "#fff",
        background: "#FFF4E5",
        borderRadius: "4px",
        fontWeight: "500",
        width: "auto",
        height: "auto",
        textAlign: "left",
        fontSize: "14px",
      },
    });
  }
}

export const Toast = new ToastClass();
