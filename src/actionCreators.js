export const changeTeacherContainerChildren = data => {
  return {
    type: 'CHANGE_CHILDREN',
    data: data
  }
}


export const changeCurrentCourse = course => {
  return {
    type: 'CHANGE_CURRENT_COURSE',
    data: course
  }
}


export const showSaveNotesButton = value => {
  return {
    type: 'SHOW_SAVE_NOTES_BUTTON',
    data: value
  }
}