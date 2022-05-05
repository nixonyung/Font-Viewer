import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'demoFontIdx',
  initialState: 1,
  reducers: {
    updateDemoFontIdx: (state, action) => {
      const { value, type, fontsLength } = action.payload

      if (value !== undefined) return value

      switch (type) {
        case 'inc':
          return (state + 1) % fontsLength
        case 'dec':
          return (state - 1 + fontsLength) % fontsLength
        default:
          console.log("[updateDemoFontIdx] type should be 'inc' or 'dec'")
      }

      // let newDemoFontIdx = action.payload

      // return newDemoFontIdx
    }
  }
})

export const { updateDemoFontIdx } = slice.actions
export default slice.reducer
