import { createStore } from 'redux'

const reducer = (state, action) => {
  if (action.type === "CHANGE_CURRENT_COURSE") {
    return {
      ...state,
      currentCourse: action.data
    }
  }
  if (action.type === "CHANGE_CHILDREN") {
    return {
      ...state,
      showConfig: action.data
    }
  }

  if (action.type === "SHOW_SAVE_NOTES_BUTTON") {
    return {
      ...state,
      showSaveNotes: action.data
    }
  }

  return state;
}


export default createStore(reducer,
  {
    teacherName: 'teacherName',
    currentCourse: { materia: '' },
    showSaveNotes: false,
    showConfig: { myCourse: true, finalsContent: false, courseInformation: false }
  }
  , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())