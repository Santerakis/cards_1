import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import login from "../features/auth/Login/Login";
import { AxiosError, isAxiosError } from "axios";
import { unhandleAction } from "../common/actions/unhandleAction";

const slice = createSlice({
  name: 'app',
  initialState: {
    error: null as string | null,
    isLoading: false,
    isAppInitialized: false,
    unhandleActions: [] as string[]
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<{isLoading: boolean}>) => {
      let a = current(state) //real state in "a" for debbuger
      state.isLoading = action.payload.isLoading
    },
    setError: (state, action: PayloadAction<{error: string | null}>) => {
      state.error = action.payload.error
    }
  },
  extraReducers: builder => {
    // там где логика повторяется неплохо использовать addMatcher
    // матчер(предикат) и подредусер
    builder.addMatcher((action)=>{
      console.log('addMatcher predicator: ', action.type)
      // if(action.type === 'auth/register/pending') return false // чтобы небыло крутилки
      return action.type.endsWith('/pending')
      // return true // тогда срабатывает подредусер
    }, (state, action)=>{
      // на каждый экшен и скрытый экшен вызывают это колбек(в адматчер), если предикат возвр. true
      // можно ложить в любой слайб, без разницы
      console.log('✅ addMatcher: ', action.type)
      state.isLoading = true
    })
      .addMatcher((action)=>{
        return action.type.endsWith('/rejected')
      }, (state, action)=>{

        const err = action.payload as Error | AxiosError<{ error: string }>;
        if (isAxiosError(err)) {
          const error = err.response ? err.response.data.error : err.message;
          state.error = error
          // dispatch(appActions.setError({ error }));
        } else {
          state.error = `Native error ${err.message}`
          // dispatch(appActions.setError({ error: `Native error ${err.message}` }));
        }

        state.isLoading = false
      })
      .addMatcher((action)=>{
        return action.type.endsWith('/fulfilled')
      }, (state)=>{
        state.isLoading = false
      })
      .addDefaultCase((state, action) => {
        // debugger
        console.log("addDefaultCase 🚀", action.type);
        state.unhandleActions.push(action.type)
      });
  }
}) // в итоге выирыш(ререндер?) экшен setIsLoading диспачется под капотом(в Redux tools не выводится)

export const appReducer = slice.reducer
export const appActions = slice.actions

