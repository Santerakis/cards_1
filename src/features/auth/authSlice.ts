import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, ProfileType } from "./authApi";
import { AppDispatch, RootState } from "../../app/store";
import { createAppAsyncThunk } from "../../common/utils/createAppAsyncThunk";

// const register = createAsyncThunk("auth/register", (arg: ArgRegisterType, thunkAPI) => {
//   const { dispatch, getState, rejectWithValue } = thunkAPI;
//   authApi.register(arg).then((res) => {
//     console.log("res: ", res);
//   });
// });

const register = createAsyncThunk<void, ArgRegisterType, {
  state: RootState
  dispatch: AppDispatch   //Dispatch
  rejectValue: unknown
}>("auth/register", async (arg, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  try {
    await authApi.register(arg);
  } catch (e: any) {
    debugger
    const err = e.response.data.error
    return rejectWithValue(err)
  }
});

// const login = createAsyncThunk("auth/login", (arg: ArgLoginType, thunkAPI) => {
//   const { dispatch } = thunkAPI;
//   return authApi.login(arg).then((res) => {
//     dispatch(authActions.setProfile({ profile: res.data }));
//     return { profile: res.data };
//   });
// });

// async()=>{} - всегда возвращает промиc
const login = createAppAsyncThunk < { profile: ProfileType }, ArgLoginType>
  ("auth/login", async (arg, thunkAPI) => {
    const res = await authApi.login(arg);
    return { profile: res.data };  //go to promise
  });



const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    authError: ''
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
    .addCase(register.rejected, (state, action) => {
      debugger
    })
    // .addCase(register.rejected, (state, action) => {
    //   debugger
    // });
  }
});


export const authReducer = slice.reducer;
// export const authActions = slice.actions;
export const authThunks = { register, login };    //все санки упаковываем в объект

