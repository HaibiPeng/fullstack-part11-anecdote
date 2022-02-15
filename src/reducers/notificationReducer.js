const notificationReducer = (state = { message: '', toShow: false , id: 0 }, action) => {
  switch (action.type) {
  case 'ADD_NOTIFICATION':
    return { message: `you voted '${action.data.content}'`, toShow: true }
  case 'REMOVE_NOTIFICATION':
    return { message: '', toShow: false, id: action.id }
  case 'ADD_ANECDOTE':
    return { message: `you added '${action.data.content}'`, toShow: true }
  case 'REMOVE_ANECDOTE':
    return { message: `you removed '${action.data.content}'`, toShow: true }
  default:
    return state
  }
}


let nextNotificationId = 0
function showNotification(type, content, id) {
  return { type: type, data: { content }, id }
}

function hideNotification(id) {
  return { type: 'REMOVE_NOTIFICATION', id }
}

export const setNotification = (content, time, flag) => {
  const id = nextNotificationId++

  return function (dispatch) {

    if (flag === 0) {
      dispatch(
        showNotification('ADD_NOTIFICATION', content, id)
      )
    } else if (flag === 1) {
      dispatch(
        showNotification('REMOVE_ANECDOTE', content, id)
      )
    } else {
      dispatch(
        showNotification('ADD_ANECDOTE', content, id)
      )
    }

    setTimeout(() => {
      dispatch(hideNotification(id))
    }, time * 1000)
  }
}

export default notificationReducer