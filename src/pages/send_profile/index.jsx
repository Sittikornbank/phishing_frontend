// ** Next Import
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

import TableSendProfile from 'src/views/pages/send-profile/TableSendProfile'

// ** Icon Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'

const SendProfile = () => {
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [data, setData] = useState()

  const handleSetShow = (field, value) => {
    setData(false)
    setShow(true)
  }

  return (
    <>
      <Typography variant='h3'>Sending Profile</Typography>
      <hr />
      <Button variant='contained' sx={{ my: 4 }} onClick={handleSetShow} startIcon={<AddCircleIcon fontSize='large' />}>
        New Page
      </Button>
      <Card sx={{ my: 4, p: 6 }}>
        <TableSendProfile showCreate={{ show, setShow }} />
      </Card>
    </>
  )
}

SendProfile.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default SendProfile
