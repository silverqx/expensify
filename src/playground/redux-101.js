import { createStore } from 'redux'

// Look at TAG: X comments, to disclose related code after refactoring

// Action Creators ( Andrew calls them Action Generators )

// Action Generators are functions that return action objects
// Action Object is object passed to the store.dispatch() method:
/*
store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5
})
*/

// TAG: 1
// const incrementCount = (payload = {}) => ({
//     type: 'INCREMENT',
//     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// })
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type: 'RESET'
})

const setCount = ({ count }) => ({
    type: 'SET',
    count
})

// Reducers
// 1. Reducers are pure functions ( https://en.wikipedia.org/wiki/Pure_function )
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            // TAG: 1
            // const incrementBy = typeof action.incrementBy === 'number'
            //     ? action.incrementBy : 1
            // return {
            //     count: state.count + incrementBy
            // }
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            return {
                count: action.count
            }
        default:
            return state
    }
}

// Store
const store = createStore(countReducer)

// TAG: 2
const unsubscribe = store.subscribe(() => console.log(store.getState()))

// dispatch method calls callback in createStore function
// TAG: 1
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// })
store.dispatch(incrementCount({ incrementBy: 5 }))

// TAG: 1
// store.dispatch({
//     type: 'INCREMENT'
// })
store.dispatch(incrementCount())

// TAG: 2
// unsubscribe()

store.dispatch(decrementCount())
// dispatch() method returns Action Object
const countOne = store.dispatch(decrementCount({ decrementBy: 10 }))
console.log(countOne)

store.dispatch(resetCount())

store.dispatch(setCount({ count: 2 }))
