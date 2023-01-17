import { createSlice } from '@reduxjs/toolkit'

export const outlineSlice = createSlice({
    name: 'outline',
    initialState: {
        value: [],
    },
    reducers: {
        setOutlineState: (state, action) => {
            state.value = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setOutlineState } = outlineSlice.actions

export default outlineSlice.reducer