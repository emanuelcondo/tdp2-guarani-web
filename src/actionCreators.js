export const changeTeacherContainerChildren = childrenName => {
  return {
    type: 'CHANGE_CHILDREN',
    data: childrenName
  }
}


export const changeCurrentCourse = course => {
  return {
    type: 'CHANGE_CURRENT_COURSE',
    data: course
  }
}