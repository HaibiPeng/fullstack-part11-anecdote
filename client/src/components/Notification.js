import React from 'react'

const Notification1 = ({ errormessage }) => {
  if (errormessage === null) {
    return null
  }

  return (
    <div className="error">
      {errormessage}
    </div>
  )
}

const Notification2 = ({ successmessage }) => {
  if (successmessage === null) {
    return null
  }

  return (
    <div className="success">
      {successmessage}
    </div>
  )
}

export default { Notification1, Notification2 }