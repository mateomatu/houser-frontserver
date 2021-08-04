import React, { useCallback, useEffect, useState, createContext } from "react";
import styles from "./toast-context.module.css";

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts((toasts) => toasts.slice(1)),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = useCallback(
    function (toast) {
      setToasts((toasts) => [...toasts, toast]);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className={styles['toasts-wrapper']}>
        {toasts.map((toast) => (
          <div className={styles.toast} key={toast}>
            {toast}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
