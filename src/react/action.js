const initState = {a: '11'}
// reducers
export default function counter(state = initState, action){
  switch(action.type){
    case 'TABLE':
      console.log('reducers')
      return {
        ...state,
        b: '12'
      }

    default:
      return state
  }
}

// action 
export function demo(){
  console.log('action clearArr')
  return {
    type: 'TABLE'
  }
}