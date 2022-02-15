import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { addVotes, deleteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, votehandleClick, deletehandleClick }) => {
  return(
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
          has {anecdote.votes} votes
        <button onClick={votehandleClick} id='vote'>vote</button>
        <button onClick={deletehandleClick} id='delete'>delete</button>
      </div>
    </div>
  )
}

const Anecdotes = (props) => {
  /*
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
    .sort((a, b) => b.votes - a.votes)
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVotes(anecdote))
    dispatch(setNotification(anecdote.content, 5, 0))
  }

  const Delete = (anecdote) => {
    dispatch(deleteAnecdote(anecdote))
    dispatch(setNotification(anecdote.content, 5, 1))
  }
  */

  const vote = (anecdote) => {
    props.addVotes(anecdote)
    props.setNotification(anecdote.content, 5, 0)
  }

  const Delete = (anecdote) => {
    props.deleteAnecdote(anecdote)
    props.setNotification(anecdote.content, 5, 1)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          votehandleClick={() => vote(anecdote)}
          deletehandleClick={() => Delete(anecdote)}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: (state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
    )
  }
}

const mapDispatchToProps = {
  addVotes,
  deleteAnecdote,
  setNotification,
}

//export default Anecdotes
const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)
export default ConnectedAnecdotes
