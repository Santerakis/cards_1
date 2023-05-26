import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

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
      debugger
      state.error = action.payload.error
    }
  }
})

export const appReducer = slice.reducer
export const appActions = slice.actions

