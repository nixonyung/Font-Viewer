import { createSlice } from '@reduxjs/toolkit'

const FONTSIZEDEFAULT = 1.5
const LETTERSPACINGDEFAULT = 0

export const slice = createSlice({
  name: 'displayTextOptions',
  initialState: {
    styles: [],
    letterSpacing: LETTERSPACINGDEFAULT,
    fontSize: FONTSIZEDEFAULT
  },
  reducers: {
    updateStyles: (state, action) => {
      const newStyles = action.payload

      state.styles = newStyles
    },

    updateFontSize: (state, action) => {
      if (action.payload?.type === 'reset') {
        state.fontSize = FONTSIZEDEFAULT
        return
      }

      const newFontSize = action.payload

      state.fontSize = newFontSize
    },

    updateLetterSpacing: (state, action) => {
      console.log(action)

      if (action.payload?.type === 'reset') {
        state.letterSpacing = LETTERSPACINGDEFAULT
        return
      }

      const newLetterSpacing = action.payload

      state.letterSpacing = newLetterSpacing
    }
  }
})

export const {
  updateStyles,
  updateFontSize,
  updateLetterSpacing
} = slice.actions
export default slice.reducer
