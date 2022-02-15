import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(store => store.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={notification.toShow ? style : { display: 'none' }}>
      {notification.message}
    </div>
  )
}

export default Notification