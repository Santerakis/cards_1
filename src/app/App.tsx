import { Counter } from "../features/counter/Counter";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { useEffect } from "react";
import { appActions } from "./appSlice";
import { authApi } from "../features/auth/authApi";
import { LinearProgress } from "@mui/material";
import s from "./App.module.css"

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(appActions.setIsLoading({ isLoading: false }));
  //   }, 1500);
  // }, []);

  console.log('App');
  return (
    <div>
      {isLoading && <LinearProgress />}
      {/*<Counter />*/}
    </div>
  );
}

export default App;