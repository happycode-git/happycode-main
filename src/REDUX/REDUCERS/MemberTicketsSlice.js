import { createSlice } from '@reduxjs/toolkit'

export const memberTicketsSlice = createSlice({
  name: 'memberTickets',
  initialState: {
    value: [],
  },
  reducers: {
    setMemberTicketsState: (state, action) => {
        state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMemberTicketsState } = memberTicketsSlice.actions

export default memberTicketsSlice.reducer