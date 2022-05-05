import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'demoFontIdx',
  initialState: 1,
  reducers: {
    updateDemoFontIdx: (state, action) => {
      let newDemoFontIdx = action.payload

      return newDemoFontIdx
    }
  }
})

export const { updateDemoFontIdx } = slice.actions
export default slice.reducer
