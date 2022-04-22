import { createSlice } from '@reduxjs/toolkit'
import availableTags from './availableTags'

const LOCALSTORAGEPROPNAME = 'fonts'

// const fontsDefault = {
//   'Nanum Brush Script': 'Handwriting'
// }
const fontsDefault = ['Nanum Brush Script']

export const slice = createSlice({
  name: 'fonts',
  initialState: localStorage.getItem(LOCALSTORAGEPROPNAME)
    ? JSON.parse(localStorage.getItem(LOCALSTORAGEPROPNAME))
    : fontsDefault,
  reducers: {
    addFont: (state, action) => {
      const newFontName = action.payload

      if (state.indexOf(newFontName) === -1) state.push(newFontName)

      slice.caseReducers.saveRecords(state)
    },

    removeFont: (state, action) => {
      const removedFontName = action.payload

      const newState = state.filter(fontName => fontName !== removedFontName)

      slice.caseReducers.saveRecords(newState)
      return newState
    },

    importRecords: (state, action) => {
      const importedRecord = JSON.parse(action.payload)

      const newFonts = []

      Object.entries(importedRecord).forEach(([fontName, tag]) => {
        if (tag !== availableTags.slice(-1)[0])
          localStorage.setItem(fontName, tag)
        newFonts.push(fontName)
      })

      slice.caseReducers.saveRecords(newFonts)
      return newFonts
    },

    resetFonts: (state, action) => {
      localStorage.clear()
      slice.caseReducers.saveRecords(fontsDefault)
      return fontsDefault.slice()
    },

    saveRecords: (state, action) => {
      // state.records.sort(({ fontName: a }, { fontName: b }) => a.localeCompare(b))

      // state.records.sort((a, b) => {
      //   let i = availableTags.length
      //   if (a.tags.length) i = availableTags.indexOf(a.tags[0])
      //   let j = availableTags.length
      //   if (b.tags.length) j = availableTags.indexOf(b.tags[0])

      //   return i - j
      // })

      localStorage.setItem(LOCALSTORAGEPROPNAME, JSON.stringify(state))
    }
  }
})

export const { addFont, removeFont, importRecords, resetFonts } = slice.actions
export default slice.reducer
