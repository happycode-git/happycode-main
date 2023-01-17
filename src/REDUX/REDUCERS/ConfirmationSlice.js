import { createSlice } from '@reduxjs/toolkit'

export const confirmationSlice = createSlice({
  name: 'confirmation',
  initialState: {
    value: false,
  },
  reducers: {
    setConfirmationState: (state, action) => {
        state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setConfirmationState } = confirmationSlice.actions

export default confirmationSlice.reducer