import _ from 'lodash'

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export function addOrRemove(arr, val) {
  if (!_.includes(arr, val)) {
    arr.push(val);
  } else {
    _.remove(arr, item => item === val);
  }
}


export function shuffleArray(array) {
  return _.shuffle(array)
}

// export function addCardToDeck
