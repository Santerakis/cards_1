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
      email: "ccf@bk.ruu",
      password: "12345678",
      rememberMe: false
    };
    dispatch(authThunks.login(payload))
      .unwrap() // для поподания в catch, т.к. createAsyncThunk will always return a resolved promise
      .then((res) => {
      debugger
      toast.success('Вы успешно залогинились!')
      setTimeout(() => {
        navigate('/packs')
      }, 1000)  //как искуственный вариант, но в реале нужно использ. IsLoggedIn

    })
      .catch((err) => {})
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