import {
  
} from '../constants/actionTypes'

const initialTestState = {
  title: 'Example test title',
  current: 0,
  total: 10,
  quest: {
    content: 'Quest example, one add one equal',
    answers: [
      { label: 'a', content: 'one' },
      { label: 'b', content: 'two' },
      { label: 'c', content: 'three' },
      { label: 'd', content: 'four' },
    ]
  }
}

const testRecuder = (state=initialTestState, action) => {
  switch (action.type) {

    default:
      return state
  }
}

export default testRecuder
