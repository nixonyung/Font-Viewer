import { configureStore } from '@reduxjs/toolkit'
import displayTextReducer from './displayTextSlice'
import fontsReducer from './fontRecordsSlice'

export default configureStore({
  reducer: {
    displayText: displayTextReducer,
    fontRecords: fontsReducer
  }
})
