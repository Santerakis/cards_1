import React from "react";
import { useAppDispatch } from "../../../common/hooks";
import { authThunks } from "../authSlice";

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
    <div>
      <h1>Login</h1>
      <button onClick={loginHandler}>login</button>
    </div>
  );
};

export default Login;