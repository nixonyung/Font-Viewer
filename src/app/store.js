import { configureStore } from '@reduxjs/toolkit'
import displayTextReducer from './slice'

export default configureStore({
  reducer: {
    displayText: displayTextReducer
  }
})
