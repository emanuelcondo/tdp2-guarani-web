import React,{Component} from 'react';
import CoursesTable from './CoursesTable'
import AddCourse from './AddCourse'

// Deprecated
class AbmCoursesContainer extends Component{
  render(){
    return <div>
      <AddCourse/>
      <CoursesTable/>
    </div>
  }
}

export default AbmCoursesContainer;