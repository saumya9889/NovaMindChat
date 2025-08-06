import { createContext, useContext, useState } from "react";

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error") => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "">("");

  const showToast = (msg: string, toastType: "success" | "error" = "success") => {
    setMessage(msg);
    setType(toastType);
    setTimeout(() => {
      setMessage("");
      setType("");
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            padding: "10px 20px",
            backgroundColor: type === "success" ? "green" : "red",
            color: "white",
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
