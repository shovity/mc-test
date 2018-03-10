import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { parseTime, parseDate } from '../../utils/time'

import './style.css'

import { fetchTestDetail } from '../../actions/testDetailActions'

class TestDetail extends Component {
  componentDidMount() {
    const { fetchTestDetail, match: { params: { id } } } = this.props
    fetchTestDetail(id)
  }

  render() {
    const { test, testLog, testStatus } = this.props
    const allowedStart = !testLog || test.quests.length > testLog.answers.length

    return (
      <div id="testDetail">
        { test && <TestInfo test={test}/> }
        { testLog && <TestStatus testLog={testLog} test={test} testStatus={testStatus}/> }
        { test && <Link to={allowedStart && `/test/${test._id}`} className={`btn btn-primary ${!allowedStart && 'disabled'}`}>Go to test</Link> }
      </div>
    )
  }

}

const TestInfo = ({ test }) => {

  return (
    <div>
      <h2>Test infomations</h2>
      <table>

        <tbody>
          <tr>
            <td>Title</td>
            <td>{ test.title }</td>
          </tr>
          <tr>
            <td>Subject</td>
            <td>{ test.subject }</td>
          </tr>
          <tr>
            <td>Size</td>
            <td>{ test.quests.length }</td>
          </tr>
          <tr>
            <td>Total time</td>
            <td>{ parseTime(test.time) }</td>
          </tr>
          <tr>
            <td>Level</td>
            <td>{test.quests.reduce((a, b) => a+ +b.level, 0)}</td>
          </tr>
          <tr>
            <td>Author</td>
            <td>{ test.author }</td>
          </tr>
          <tr>
            <td>Created date</td>
            <td>{ parseDate(test.created_date) }</td>
          </tr>
          <tr>
            <td>Descriptions</td>
            <td>{ test.descriptions }</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

const TestStatus = ({ testLog, test, testStatus }) => {
  const completed = test.quests.length === testLog.answers.length

  return (
    <div>
      <h2>Your test status <i className={`fa fa-${completed? 'check' : 'exclamation'}-circle`}></i></h2>
      <table>
        <tbody>
          <tr>
            <td>Completed</td>
            <td>{ `${testLog.answers.length}/${test.quests.length}` }</td>
          </tr>
          <tr>
            <td>Corrected</td>
            <td>{ `${testStatus.correct}/${testLog.answers.length}` }</td>
          </tr>
          <tr>
            <td>Time left</td>
            <td>{ parseTime(testStatus.timeLeft) }</td>
          </tr>
          <tr>
            <td>Date start</td>
            <td>{ parseDate(testLog.created_date) }</td>
          </tr>
          <tr>
            <td>Date { completed? 'end' : 'pause' }</td>
            <td>{ parseDate(testLog.modified_date) }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    test: state.testDetail.test,
    testLog: state.testDetail.testLog,
    testStatus: state.testDetail.testStatus,
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    fetchTestDetail: (id) => dispatch(fetchTestDetail(id)),
  }
}

TestDetail = connect(mapStateToProps, mapDispathToProps)(TestDetail)

export default TestDetail
