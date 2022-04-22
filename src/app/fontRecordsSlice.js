import { createSlice } from '@reduxjs/toolkit'
import availableTags from './availableTags'

const LOCALSTORAGEPROPNAME = 'fonts'

const fontsDefault = {
  'Nanum Brush Script': 'Handwriting'
}

export const slice = createSlice({
  name: 'fonts',
  // initialState: fontsDefault,
  initialState: localStorage.getItem(LOCALSTORAGEPROPNAME)
    ? JSON.parse(localStorage.getItem(LOCALSTORAGEPROPNAME))
    : fontsDefault,
  reducers: {
    addFont: (state, action) => {
      const newFontName = action.payload

      if (state[newFontName] === undefined)
        state[newFontName] = availableTags.slice(-1)

      slice.caseReducers.saveRecords(state)
    },

    removeFont: (state, action) => {
      const badFontName = action.payload

      delete state[badFontName]

      slice.caseReducers.saveRecords(state)
    },

    changeTag: (state, action) => {
      const { fontName, tag } = action.payload

      state[fontName] = tag

      slice.caseReducers.saveRecords(state)
    },

    importRecords: (state, action) => {
      const newState = JSON.parse(action.payload)

      slice.caseReducers.saveRecords(newState)
      return newState
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

export const { addFont, removeFont, changeTag, importRecords } = slice.actions
export default slice.reducer
