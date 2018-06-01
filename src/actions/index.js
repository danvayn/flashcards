import { timeToString, generateDecks } from '../utils/helpers'
import {v4 as uuidv4} from 'uuid'

export const ACTION_ERROR = 'ACTION_ERROR'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const REMOVE_ALL_DECKS = 'REMOVE_ALL_DECKS'
export const POPULATE_DECKS = 'POPULATE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const DELETE_CARD = 'DELETE_CARD'

export const EDIT_CARD = 'EDIT_CARD'




export const actionError = error => ({
  type: ACTION_ERROR, error
})

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function populateDecks(size=5) {
  return {
    type: POPULATE_DECKS,
    decks: generateDecks(size)
  }
}

export function addDeck(title, cards = []) {
  return {
    type: ADD_DECK,
    deck: {
      id: uuidv4(),
      title: title,
      createdAt: timeToString(),
      cards: cards,
    }
  }
}

export function removeAllDecks() {
  return {
    type: REMOVE_ALL_DECKS
  }
}

export function removeDeck (deckID) {
  return {
    type: ADD_DECK,
    deckID
  }
}

export function addCardToDeck(deckIndex,card) {
  return {
    type: ADD_CARD_TO_DECK,
    deckIndex,
    card: Object.assign({id: uuidv4()},card)
  }
}
export function editCard(deckIndex,cardIndex,card){
  return {
    type: EDIT_CARD,
    deckIndex,
    cardIndex,
    card
  }
}

export function removeCardFromDeck(cardID) {
  return {
    type: DELETE_CARD,
    id: cardID
  }
}

export function deleteDeck(deckIndex) {
  return {
    type: DELETE_DECK,
    deckIndex
  }
}
