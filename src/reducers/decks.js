import {
  RECEIVE_DECKS,
  ADD_DECK,
  EDIT_CARD,
  DELETE_CARD,
  DELETE_DECK,
  ADD_CARD_TO_DECK,
  REMOVE_ALL_DECKS,
  POPULATE_DECKS,
} from '../actions/';

import update from 'immutability-helper';

const initialState = {
};
function decks (state = initialState, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        list: [
          ...state.list,
          {...action.deck},
        ]
      }
    case REMOVE_ALL_DECKS:
      return {
        ...state,
        list: []
      }

    case DELETE_DECK:
      return {
        ...state,
        list: [
          ...state.list.slice(0, action.deckIndex),
          ...state.list.slice(action.deckIndex+1)
        ]
      }

    case POPULATE_DECKS:
      return {
        ...state,
        list: [
          ...action.decks,
        ]
      }
    case ADD_CARD_TO_DECK:
      const newData = update(state, {list: { [action.deckIndex]: { cards: {$push: [action.card]}}}})
      return newData

    case EDIT_CARD:
      const newState = update(state, {list: { [action.deckIndex]: { cards:  { [action.cardIndex]: {$set: action.card}}}}})
      return newState

    case DELETE_CARD:
      const filteredCards = state.list[action.deckIndex].cards.filter(card => card.id != action.cardID)
      const deleteState = update(state, {list: { [action.deckIndex]: { cards: { $set: filteredCards }}}})
      return deleteState
    default :
      return state
  }
}

export default decks
