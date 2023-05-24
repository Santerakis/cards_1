import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, ProfileType } from "./authApi";

// const register = createAsyncThunk("auth/register", (arg: ArgRegisterType, thunkAPI) => {
//   const { dispatch, getState, rejectWithValue } = thunkAPI;
//   authApi.register(arg).then((res) => {
//     console.log("res: ", res);
//   });
// });

const register = createAsyncThunk("auth/register", async (arg: ArgRegisterType, thunkAPI) => {
  debugger
  await authApi.register(arg);
});

// const login = createAsyncThunk("auth/login", (arg: ArgLoginType, thunkAPI) => {
//   const { dispatch } = thunkAPI;
//   return authApi.login(arg).then((res) => {
//     dispatch(authActions.setProfile({ profile: res.data }));
//     return { profile: res.data };
//   });
// });

// async()=>{} - всегда возвращает промиc
const login = createAsyncThunk("auth/login", async (arg: ArgLoginType, thunkAPI) => {
  const res = await authApi.login(arg);
  return { profile: res.data };
});

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null
  },
  reducers: {
    // setProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
    //   state.profile = action.payload.profile;
    // }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      })
      // .addCase(register.rejected, (state, action) => {
      //   debugger
      // });
  }
});

export const authReducer = slice.reducer;
// export const authActions = slice.actions;
export const authThunks = { register, login };    //все санки упаковываем в объект

