import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { ContactFormData } from '../../types'

interface ContactState {
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string | null
}

const initialState: ContactState = {
  status: 'idle',
  error: null,
}

export const submitContact = createAsyncThunk(
  'contact/submit',
  async (data: ContactFormData, { rejectWithValue }) => {
    try {
      const base = import.meta.env.VITE_API_URL ?? ''
      await axios.post(`${base}/api/contact`, data)
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : 'Something went wrong. Please try again.'
      return rejectWithValue(message)
    }
  }
)

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContact(state) {
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.status = 'success'
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload as string
      })
  },
})

export const { resetContact } = contactSlice.actions
export default contactSlice.reducer
