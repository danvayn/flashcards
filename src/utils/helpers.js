import randomWords from 'random-words'
import {v4 as uuidv4} from 'uuid'
import _ from 'lodash'

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}


export function showActionSheet(actionSheet){
  actionSheet.show()
}

export function addOrRemove(arr, val) {
  if (!_.includes(arr, val)) {
    arr.push(val);
  } else {
    _.remove(arr, item => item === val);
  }
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
  let newDecks = _.times(5, () => {
    const id = uuidv4()
    return generateDeck(id)
  })
  console.log(newDecks)
  console.log(newDecks)
  console.log(newDecks)

  return newDecks
}

// export function addCardToDeck
