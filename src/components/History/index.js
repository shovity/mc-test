import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchHistory } from '../../actions/historyActions'
import { parseDate } from '../../utils/time'
import { Link } from 'react-router-dom'

import './style.css'

class History extends Component {

  componentDidMount() {
    this.props.fetchHistory()
  }

  render() {
    const { testLogs } = this.props

    const listItem = testLogs.map((testLog, index) => {
      return (
        <Item key={index} testLog={testLog} />
      )
    })

    return (
      <div id="history">
        <table>

          <tbody>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Process</th>
              <th>Date</th>
              <th></th>
            </tr>
            { listItem }
          </tbody>
        </table>
      </div>
    )
  }

}

const Item = ({ testLog }) => {
  const ended = testLog.answers.length === testLog.test.quests.length

  return (
    <tr>
      <td>{ testLog.test.title }</td>
      <td>{ testLog.test.subject }</td>
      <td>{ `${testLog.answers.length}/${testLog.test.quests.length}` }</td>
      <td>{ parseDate(testLog.modified_date) }</td>
      <td>
        <Link to={`/test-detail/${testLog.test._id}`}><i className="fa fa fa-info-circle go detail"></i></Link>
        <Link to={!ended && `/test/${testLog.test._id}`}><i className={`fa fa-play go start ${ended && 'disabled'}`}></i></Link>
      </td>
    </tr>
  )
}

const mapStateToProps = (state) => {
  return {
    testLogs: state.history.testLogs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHistory: (limit, offset) => dispatch(fetchHistory(limit, offset)),
  }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)

export default History
