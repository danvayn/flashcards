import randomWords from 'random-words'
import {v4 as uuidv4} from 'uuid'
import { timeToString } from '../utils/helpers'

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

  return newDecks
}
