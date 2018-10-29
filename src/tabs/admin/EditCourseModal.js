import React, { Component } from 'react';
import { Modal } from 'antd';



class EditCourseModal extends Component {

  state = {
    visible: true
  }


  render() {
    return <Modal
      visible={this.props.visible}
      onOk={this.props.onOk}
      onCancel={this.props.onCancel}
    >
      <div>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </div>
    </Modal>

  }
}


export default EditCourseModal;