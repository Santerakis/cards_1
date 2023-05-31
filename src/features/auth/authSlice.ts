import {createSlice} from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, ProfileType } from "./authApi";
import { createAppAsyncThunk, thunkTryCatch } from "../../common/utils";

// const register = createAsyncThunk("auth/register", (arg: ArgRegisterType, thunkAPI) => {
//   const { dispatch, getState, rejectWithValue } = thunkAPI;
//   authApi.register(arg).then((res) => {
//     console.log("res: ", res);
//   });
// });

// const register = createAsyncThunk<void, ArgRegisterType, {
//   state: RootState
//   dispatch: AppDispatch   //Dispatch
//   rejectValue: unknown
// }>("auth/register", async (arg, thunkAPI) => {
//   const {dispatch, rejectWithValue} = thunkAPI
//   try {
//     await authApi.register(arg);
//   } catch (e: any) {
//     debugger
//     const err = e.response.data.error
//     return rejectWithValue(err)
//   }
// });
// const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     await authApi.register(arg);
//   } catch (e: any) {

//     // if (e.response) {
//     //   const err = e.response.data.error;
//     //   dispatch(appActions.setError({ error: err }));
//     // } else {
//     //   dispatch(appActions.setError({ error: e.message }));
//     // }

//     const error = e.response ? e.response.data.error : e.message;
//     dispatch(appActions.setError({ error }));
//     return rejectWithValue(null);  //чтобы корректно было в дебагере Redux без него ../fullfield
//   }
// });

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg: ArgRegisterType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.register(arg);
  });
});

// const login = createAsyncThunk("auth/login", (arg: ArgLoginType, thunkAPI) => {
//   const { dispatch } = thunkAPI;
//   return authApi.login(arg).then((res) => {   //return т.к. then, в async()=>{} не недо return
//     dispatch(authActions.setProfile({ profile: res.data }));
//   });
// });


// // async()=>{} - всегда возвращает промиc
// const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>
// ("auth/login", async (arg, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     const res = await authApi.login(arg);
//     return { profile: res.data };  //go to promise
//   } catch (e: any) {
//     const error = e.response ? e.response.data.error : e.message;
//     dispatch(appActions.setError({ error }));
//     return rejectWithValue(null);  //тут обязательно
//   }
//   // const res = await authApi.login(arg);
//   // return { profile: res.data };  //go to promise
// });


const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/register", async (arg: ArgLoginType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.login(arg);
    return { profile: res.data };
  }, false);
});

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null
    // authError: ""
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
      });
    // .addCase(register.rejected, (state, action) => {
    //   debugger
    //   state.authError = action.payload;
    // });
    // .addCase(register.rejected, (state, action) => {
    //   debugger
    // });
  }
});


export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login };    //все санки упаковываем в объект

