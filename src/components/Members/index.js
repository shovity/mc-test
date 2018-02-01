import React, { Component } from 'react';
import { connect } from 'react-redux';

class Members extends Component {

  render() {
    return (
      <div>
        { JSON.stringify(this.props.members) }
      </div>
    );
  }

}

const mapStateTopProps = state => {
  return {
    total: state.members.total,
    members: state.members.members
  }
}

Members = connect(mapStateTopProps)(Members)

export default Members;
