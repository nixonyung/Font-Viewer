import { configureStore } from '@reduxjs/toolkit'
import displayTextReducer from './displayTextSlice'
import fontsReducer from './fontsSlice'

export default configureStore({
  reducer: {
    displayText: displayTextReducer,
    fonts: fontsReducer
  }
})
