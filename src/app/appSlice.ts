import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import login from "../features/auth/Login/Login";

const slice = createSlice({
  name: 'app',
  initialState: {
    error: null as string | null,
    isLoading: false,
    isAppInitialized: false,
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
      if(action.type === 'auth/register/pending') return false
      return action.type.endsWith('/pending')
      // return true // тогда срабатывает подредусер
    }, (state, action)=>{
      // на каждый экшен и скрытый экшен вызывают это колбек(в адматчер), если предикат возвр. true
      // можно ложить в любой слайб, без разницы
      console.log('✅ addMatcher: ', action.type)
      state.isLoading = true
    })
      .addMatcher((action)=>{
        return action.type.endsWith('/fulfilled')
      }, (state, action)=>{
        state.isLoading = false
      })
      .addMatcher((action)=>{
        return action.type.endsWith('/rejected')
      }, (state, action)=>{ 
        state.isLoading = false
      })
  }
}) // в итоге выирыш(ререндер?) экшен setIsLoading диспачется под капотом(в Redux tools не выводится)

export const appReducer = slice.reducer
export const appActions = slice.actions

