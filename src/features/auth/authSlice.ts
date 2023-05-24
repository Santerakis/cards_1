import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi } from "./authApi";

const register = createAsyncThunk("auth/register", (arg: ArgRegisterType, thunkAPI) => {
  // const { dispatch, getState, rejectWithValue } = thunkAPI;
  authApi.register(arg).then((res) => {
    console.log('res: ',res)
  });
});

const login = createAsyncThunk("auth/login", (arg: ArgLoginType, thunkAPI) => {
  authApi.login(arg).then((res) => {
    console.log('login res: ', res.data)
  })
})

const slice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {}
});

export const authReducer = slice.reducer
export const authThunks = {register, login}    //все санки упаковываем в объект

