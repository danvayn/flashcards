import randomWords from 'random-words'
import {v4 as uuidv4} from 'uuid'
import _ from 'lodash'

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

// export function deckGenerator
// function generateCards(front=randomWords(2).join(' '), back=randomWords(2).join(' '), hint='', size=5) {
//   let x = new Set()
// }

export function addOrRemove(arr, val) {
  if (!_.includes(arr, val)) {
    arr.push(val);
  } else {
    _.remove(arr, item => item === val);
  }
}



function randomText(length='short'){
  if(length === 'short')
    return (randomWords(2).join(' '))
  else
    return (randomWords(4).join(' '))
}

function generateCard(){
  const front = randomWords(2).join(' ')
  const back = randomWords(2).join(' ')

  return {
    id: uuidv4(),
    front,
    back,
  }
}

function generateDeck(id, title=randomWords(4).join(' ')){
  let cards = _.times(5, () => generateCard())

  return {
    id: id,
    title: title,
    createdAt: timeToString(),
    cards
  }
}

export function generateDecks(size){
  const newDecks = {}

  _.times(size, () => {
    const title = randomText('long')
    const id = uuidv4()
    newDecks[id] = generateDeck(id, title)
  })

  return newDecks
}

// export function addCardToDeck
