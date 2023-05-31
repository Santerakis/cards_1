import React from "react";
import { useAppDispatch } from "../../../common/hooks";
import { authThunks } from "../authSlice";
import s from "./Login.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const loginHandler = () => {
    const payload = {
      email: "ccf@bk.ru",
      password: "12345678",
      rememberMe: false
    };
    dispatch(authThunks.login(payload)).then((res) => {
      toast.success('Вы успешно залогинились!')
      setTimeout(() => {
        navigate('/packs')
      }, 2000)  //как искуственный вариант, но в реале нужно использ. IsLoggedIn

    })
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