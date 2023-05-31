import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import login from "../features/auth/Login/Login";
import { AxiosError, isAxiosError } from "axios";
import { unhandleAction } from "../common/actions/unhandleAction";
import { authThunks } from "../features/auth/authSlice";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    isLoading: false,
    isAppInitialized: false,
    unhandleActions: [] as string[]
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      let a = current(state); //real state in "a" for debbuger
      state.isLoading = action.payload.isLoading;
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    }
  },
  extraReducers: builder => {
    // там где логика повторяется неплохо использовать addMatcher
    // матчер(предикат) и подредусер
    builder.addMatcher((action) => {
      console.log("addMatcher predicator: ", action.type);
      // if(action.type === 'auth/register/pending') return false // чтобы небыло крутилки
      return action.type.endsWith("/pending");
      // return true // тогда срабатывает подредусер
    }, (state, action) => {
      // на каждый экшен и скрытый экшен вызывают это колбек(в адматчер), если предикат возвр. true
      // можно ложить в любой слайб, без разницы
      console.log("✅ addMatcher: ", action.type);
      state.isLoading = true;
    })
      .addMatcher((action) => action.type.endsWith("/rejected"),
        (state, action) => {
          // debugger
          state.isLoading = false;

          if (!action.payload.showGlobalError) return;
          const err = action.payload.e as Error | AxiosError<{ error: string }>;
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message;
          } else {
            state.error = `Native error ${err.message}`;
          }


          // чтоб небыло второй глобальной ошибки-нотификашки
          // if (action.type === authThunks.login.rejected.type) return;   // ? "auth/register/rejected"
          // if (action.type === authThunks.login.rejected.type) return;
          // if (action.type === authThunks.login.rejected.type) return; // чтоб без условий так если в друг делаем функционал в обертке с отключением глоб ошибкой

          // const err = action.payload as Error | AxiosError<{ error: string }>;
          // if (isAxiosError(err)) {
          //   const error = err.response ? err.response.data.error : err.message;
          //   state.error = error;
          //   // dispatch(appActions.setError({ error }));
          // } else {
          //   state.error = `Native error ${err.message}`;
          //   // dispatch(appActions.setError({ error: `Native error ${err.message}` }));
          // }

        })
      .addMatcher((action) => {
        return action.type.endsWith("/fulfilled");
      }, (state) => {
        state.isLoading = false;
      })
      .addDefaultCase((state, action) => {
        // debugger
        console.log("addDefaultCase 🚀", action.type);
        state.unhandleActions.push(action.type);
      });
  }
}); // в итоге выирыш(ререндер?) экшен setIsLoading диспачется под капотом(в Redux tools не выводится)

export const appReducer = slice.reducer;
export const appActions = slice.actions;

