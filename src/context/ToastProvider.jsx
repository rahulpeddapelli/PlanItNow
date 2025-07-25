// context/ToastContext.js
import React, { createContext, useRef, useState, useEffect } from "react";
import { Toast } from "primereact/toast";

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);
  const [toastPosition, setToastPosition] = useState("top-right");

  useEffect(() => {
    const handleResize = () => {
      setToastPosition(window.innerWidth >= 768 ? "top-right" : "top-center");
    };

    // Set initial position
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showToast = (options) => {
    toastRef.current?.show(options);
  };

  const showSuccess = (msg) => {
    showToast({
      severity: "success",
      summary: "Success",
      detail: msg,
      life: 3000,
    });
  };

  const showError = (msg) => {
    showToast({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 3000,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError }}>
      <Toast ref={toastRef} position={toastPosition} />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
