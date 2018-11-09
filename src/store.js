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
      teacherContainerChildren: action.data
    }
  }
  return state;
}


export default createStore(reducer, { teacherContainerChildren: 'myCourses', currentCourse: {} }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())