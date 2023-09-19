import { useRef, useState } from 'react'
import { v4 as randomUUID } from 'uuid'

export default function useAlert() {
  const [message, setMessage] = useState([])
  const ref = useRef()
  ref.current = message

  function addMessage(text, type = 'info', timeout = 4000) {
    const id = randomUUID()

    const msg = {
      id,
      type,
      text,
      tickTimeout: timeout,
      timeout: setTimeout(() => {
        removeMessage(id)
      }, timeout)
    }
    setMessage([msg, ...message])
  }

  function removeMessage(id) {
    setMessage(ref.current.filter(msg => msg.id !== id))
  }

  return { addMessage, removeMessage, message }
}
