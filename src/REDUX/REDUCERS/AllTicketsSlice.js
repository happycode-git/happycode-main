import { createSlice } from '@reduxjs/toolkit'

export const allTicketsSlice = createSlice({
    name: 'alltickets',
    initialState: {
        value: [],
    },
    reducers: {
        setAllTicketsState: (state, action) => {
            state.value = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAllTicketsState } = allTicketsSlice.actions

export default allTicketsSlice.reducer