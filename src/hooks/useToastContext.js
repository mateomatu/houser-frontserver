import { useContext } from "react";
import ToastContext from "../contexts/toast-context";

export default function useToastContext() {
  return useContext(ToastContext);
}
