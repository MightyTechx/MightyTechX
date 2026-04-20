import { createSlice } from '@reduxjs/toolkit'

interface SplashState {
  visible: boolean
}

const initialState: SplashState = { visible: true }

const splashSlice = createSlice({
  name: 'splash',
  initialState,
  reducers: {
    hideSplash(state) {
      state.visible = false
    },
  },
})

export const { hideSplash } = splashSlice.actions
export default splashSlice.reducer
