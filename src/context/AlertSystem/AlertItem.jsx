import { Alert, Grow, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'

export default function AlertItem({ message, removeMessage }) {
  const [show, setShow] = useState(true)

  setTimeout(() => {
    setShow(() => false)
  }, message.tickTimeout - 250)

  function remove() {
    setShow(() => false)
    setTimeout(() => {
      removeMessage(message.id)
    }, 250)
  }

  return (
    <Grow in={show} unmountOnExit>
      <Alert
        severity={message.type}
        action={
          <IconButton aria-label='close' color={message.type} size='small' onClick={() => remove()}>
            <CloseIcon fontSize='inherit' />
          </IconButton>
        }
      >
        <strong>{message.text}</strong>
      </Alert>
    </Grow>
  )
}
