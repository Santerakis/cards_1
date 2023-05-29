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
    // матчер(предикат) и подредусер
    builder.addMatcher((action)=>{
      return true // тогда срабатывает подредусер
    }, (state, action)=>{
      // на каждый экшен и скрытый экшен вызывают это колбек(в адматчер)
      // можно ложить в любой слайб, без разницы
      console.log('✅ addMatcher: ', action.type)
    })
  }
})

export const appReducer = slice.reducer
export const appActions = slice.actions

