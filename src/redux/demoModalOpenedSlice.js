import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'demoModalOpened',
  initialState: false,
  reducers: {
    updateDemoModalOpened: (state, action) => {
      let newDemoModalOpened = action.payload

      return newDemoModalOpened
    }
  }
})

export const { updateDemoModalOpened } = slice.actions
export default slice.reducer
