import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTestStatus } from '../../actions/testActions'

class TestStatus extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isFetching: false
    }
  }

  render() {
    return (
      <div>{ JSON.stringify(this.props.status) }</div>
    )
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.handleFetchTestStatus(id)
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id
    this.handleFetchTestStatus(id)
    if (nextProps.id !== this.props.id) {
      this.setState({ isFetchTest: false })
    }
  }

  handleFetchTestStatus(id) {
    if (id !== this.props.id && !this.state.isFetching) {
      this.props.fetchTestStatus(id)
      this.setState({ isFetching: true })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.test.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTestStatus: (id) => dispatch(fetchTestStatus(id))
  }
}

TestStatus = connect(mapStateToProps, mapDispatchToProps)(TestStatus)

export default TestStatus
