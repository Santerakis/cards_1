import React from "react";
import { useAppDispatch } from "../../../common/hooks";
import { authThunks } from "../authSlice";
import s from "./Login.module.css";

const Login = () => {
  const dispatch = useAppDispatch();

  const loginHandler = () => {
    const payload = {
      email: "ccf@bk.ru",
      password: "12345678",
      rememberMe: false
    };
    dispatch(authThunks.login(payload));
  };
// TODO
  return (
    <div className={s.container}>
      <h1>Login</h1>
      <button onClick={loginHandler}>login</button>
    </div>
  );
};

export default Login;