import { createSlice } from '@reduxjs/toolkit'

const FONTWEIGHTDEFAULT = 400
const FONTSIZEDEFAULT = 1.5
const LETTERSPACINGDEFAULT = 0

export const slice = createSlice({
  name: 'displayTextOptions',
  initialState: {
    bold: false,
    italic: false,
    underline: false,
    fontWeight: FONTWEIGHTDEFAULT,
    letterSpacing: LETTERSPACINGDEFAULT,
    fontSize: FONTSIZEDEFAULT
  },
  reducers: {
    updateBold: (state, action) => {
      state.bold = !state.bold
    },

    updateItalic: (state, action) => {
      state.italic = !state.italic
    },

    updateUnderline: (state, action) => {
      state.underline = !state.underline
    },

    updateFontWeight: (state, action) => {
      if (action.payload.type === 'reset') {
        state.fontWeight = FONTWEIGHTDEFAULT
        return
      }

      const newFontWeight = action.payload

      state.fontWeight = newFontWeight
    },

    updateFontSize: (state, action) => {
      if (action.payload.type === 'reset') {
        state.fontSize = FONTSIZEDEFAULT
        return
      }

      const newFontSize = action.payload

      state.fontSize = Math.round(newFontSize * 10) / 10
    },

    updateLetterSpacing: (state, action) => {
      console.log(action)

      if (action.payload.type === 'reset') {
        state.letterSpacing = LETTERSPACINGDEFAULT
        return
      }

      const newLetterSpacing = action.payload

      state.letterSpacing = Math.round(newLetterSpacing * 10) / 10
    }
  }
})

export const {
  updateBold,
  updateItalic,
  updateUnderline,
  updateFontWeight,
  updateFontSize,
  updateLetterSpacing
} = slice.actions
export default slice.reducer
