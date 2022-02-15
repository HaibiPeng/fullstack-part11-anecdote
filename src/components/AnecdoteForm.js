import React from 'react'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  //const dispatch = useDispatch()
  const addAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //dispatch(createAnecdote(content))
    //dispatch(setNotification(content, 5, 2))
    props.createAnecdote(content)
    props.setNotification(content, 5, 2)
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" placeholder="New Anecdote" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: value => {
      dispatch(createAnecdote(value))
    },
    setNotification: value => {
      dispatch(setNotification(value, 5, 2))
    }
  }
}

//export default NewAnecdote
export default connect(
  null,
  mapDispatchToProps
)(NewAnecdote)