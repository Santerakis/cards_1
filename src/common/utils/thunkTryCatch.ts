import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "../../app/store";
import { appActions } from "../../app/appSlice";
import { AxiosError, isAxiosError } from "axios";

// export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>, logic: Function) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     return await logic();
//   } catch (e: any) {
//     const error = e.response ? e.response.data.error : e.message;
//     dispatch(appActions.setError({ error }));
//     return rejectWithValue(null);
//   }
// };

export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>, logic: Function) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    // dispatch(appActions.setIsLoading({ isLoading: true }));
    return await logic();
  } catch (e) {    // изначально е unknown
    const err = e as Error | AxiosError<{ error: string }>;  //конкретизируем
    if (isAxiosError(err)) {  // если аксиос ошибка, а не натипная(пример: обращение к свойству у несущ. свойства)
      const error = err.response ? err.response.data.error : err.message;
      dispatch(appActions.setError({ error }));
    } else {
      dispatch(appActions.setError({ error: `Native error ${err.message}` }));  // если нативная ошибка
    }
    return rejectWithValue(null);
  }
  // finally {
  //   dispatch(appActions.setIsLoading({ isLoading: false }));
  // }
};