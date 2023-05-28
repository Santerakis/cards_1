import { useAppDispatch } from "../../../common/hooks";
import { authThunks } from "../authSlice";
import s from "./Register.module.css"

export const Register = () => {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    const payload = {
      email: "ccf@bk.ru",
      password: "12345678"
    }
    dispatch(authThunks.register(payload));
  };

  return (
    <div className={s.container}>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};