// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useState } from 'react'

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
        <TableSendProfile />
      </Card>
    </>
  )
}

SendProfile.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default SendProfile
