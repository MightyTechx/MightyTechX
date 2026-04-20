import { createSlice } from '@reduxjs/toolkit'

interface NavState {
  mobileMenuOpen: boolean
  scrolled: boolean
}

const initialState: NavState = {
  mobileMenuOpen: false,
  scrolled: false,
}

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false
    },
    setScrolled(state, action) {
      state.scrolled = action.payload
    },
  },
})

export const { toggleMobileMenu, closeMobileMenu, setScrolled } = navSlice.actions
export default navSlice.reducer
