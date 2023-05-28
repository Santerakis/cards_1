import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { appActions } from "../../../app/appSlice";

export const GlobalError = () => {
  const error = useAppSelector((state: any) => state.app.error);
  const dispatch = useAppDispatch();

  if (error !== null) {
    toast.error(error);
    // toast.error('privet');
  }

  // Данный код необходим для того, чтобы занулять ошибку в стейте
  // после того как ошибка установилась.
  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch(appActions.setError({ error: null }));
      }, 1000);
    }
  }, [error]);

  console.log('Toast');
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
      theme="colored"
    />
  );
};
