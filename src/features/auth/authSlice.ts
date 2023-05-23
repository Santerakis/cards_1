import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ArgRegisterType, authApi } from "./authApi";

const register = createAsyncThunk("auth/register", (arg: ArgRegisterType, thunkAPI) => {
  // const { dispatch, getState, rejectWithValue } = thunkAPI;
  authApi.register(arg).then((res) => {
  });
});

const slice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {}
});

export const authReducer = slice.reducer
export const authThunks = {register}    //все санки упаковываю в объект