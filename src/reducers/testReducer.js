import {
  RECEIVE_TEST,
  RECEIVE_QUESTION,
  REQUEST_TEST,
  TEST_FINISHED,
  REQUEST_TEST_STATUS,
  RECEIVE_TEST_STATUS,
  LOG_OUT,
  RECEIVE_POST_QUESTION_RESULT,
  POST_QUESTION,
  RECEIVE_QUESTIONS,
} from '../constants/actionTypes'

const initialState = {
  id: '',
  title: '',
  current: 0,
  total: 0,
  time: 0,
  timeLeft: 0,
  quest: {
    content: '',
    answers: []
  },
  isFinished: false,
  status: {},
  postQuestionRedult: {},
  questions: [],
}

const testRecuder = (state=initialState, action) => {
  const type = action.type
  const data = action.data || {}

  switch (type) {
    case REQUEST_TEST:
      return { ...state, isFinished: false }

    case RECEIVE_TEST:
      if (data.isFinished === true) return { ...state, isFinished: true }
      const { title, current, total, id, time, timeLeft } = data
      return { ...state, title, current, total, id, time, timeLeft }

    case RECEIVE_QUESTION:
      return {
        ...state,
        quest: data.quest,
        current: data.current,
        timeLeft: data.timeLeft
      }

    case RECEIVE_QUESTIONS:
      return {
        ...state,
        questions: data.questions
      }

    case TEST_FINISHED:
      return { ...state, isFinished: true }

    case REQUEST_TEST_STATUS:
      return state

    case RECEIVE_TEST_STATUS:
      return { ...state, status: data.status }

    case POST_QUESTION:
      return { ...state, postQuestionRedult: { id: '' } }

    case RECEIVE_POST_QUESTION_RESULT:
      return { ...state, postQuestionRedult: data }

    case LOG_OUT:
      return initialState

    default:
      return state
  }
}

export default testRecuder
