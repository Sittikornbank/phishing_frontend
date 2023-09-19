import AlertItem from './AlertItem'
import { useTheme } from '@mui/material'
import { Stack } from '@mui/material'
import React from 'react'

const style_Alert = theme => ({
  position: 'fixed',
  width: '400px',
  right: 0,
  margin: '1rem',
  zIndex: 9999,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: '0 1rem',
    margin: 0
  }
})

export { default as useAlert } from '.'

export default function MessageQueue({ message = [], removeMessage }) {
  const theme = useTheme()

  return (
    <Stack direction='column' justifyContent='center' alignContent='center' spacing={2} sx={style_Alert(theme)}>
      {message.map(data => (
        <AlertItem key={data.id} message={data} removeMessage={removeMessage} />
      ))}
    </Stack>
  )
}
