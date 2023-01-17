import { createSlice } from '@reduxjs/toolkit'

export const partnersSlice = createSlice({
  name: 'partners',
  initialState: {
    value: [],
  },
  reducers: {
    setPartnersState: (state, action) => {
        state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPartnersState } = partnersSlice.actions

export default partnersSlice.reducer