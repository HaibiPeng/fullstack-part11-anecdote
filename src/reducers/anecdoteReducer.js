import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_ANECDOTE':
    return [...state, action.data]
  case 'INIT_ANECDOTES':
    return action.data
  case 'ADD_VOTES':{
    const id = action.data.id
    const anecdoteToAdd = state.find(n => n.id === id)
    const changedanecdote = {
      ...anecdoteToAdd,
      votes: anecdoteToAdd.votes + 1
    }
    return state.map(anecdote =>
      anecdote.id !== id ? anecdote : changedanecdote
    )
  }
  case 'DELETE_ANECDOTE':{
    const id = action.data.id
    return state.filter(anecdote => anecdote.id !== id)
  }
  default:
    return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const addVotes = (anecdote) => {
  return async dispatch => {
    const id = anecdote.id
    dispatch({
      type: 'ADD_VOTES',
      data: { id },
    })
    await anecdoteService.addVotes({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
  }
}


export const deleteAnecdote = (anecdote) => {
  return async dispatch => {
    const id = anecdote.id
    dispatch({
      type: 'DELETE_ANECDOTE',
      data: { id },
    })
    await anecdoteService.DeleteAnecdote(id)
  }
}

export default reducer