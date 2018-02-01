const Test = require('./models/Test');
const connect = require('./connect')

for (let i = 0; i < 3; i++) {
  const qs = []
  for (let iq = 0; iq < 10; iq++) {
    qs.push({
      content: 'Quest content ' + iq,
      true_answer: 'a',
      answers: [
        {
          label: 'a',
          content: 'answer content a' + iq
        },
        {
          label: 'b',
          content: 'answer content b' + iq
        },
        {
          label: 'c',
          content: 'answer content c' + iq
        },
        {
          label: 'd',
          content: 'answer content d' + iq
        },
      ]
    })
  }

  const test = new Test({
    title: 'Test title ' + i,
    quests: qs
  })

  test.save((err, test) => {
    if(err) return console.log(err)
    console.log(test)
  })
}
