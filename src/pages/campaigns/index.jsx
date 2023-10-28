import React, { useState, useCallback } from 'react'

import { useGetCampaigns_summaryQuery } from 'src/store/api'

// MUI Import
import Typography from '@mui/material/Typography'
import { Card, CardHeader, CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'

// ** Icon Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DashboardTable from 'src/views/table/DashboardTable'
import DialogCreateCampains from 'src/views/pages/campains/DialogCreateCampains'

const modal_style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 6
}

const initialUserData = {
  Name: '',
  Email: '',
  Landing_page: '',
  url: '',
  lunch_date: '',
  send_email_by: '',
  sending_profile: '',
  group: ''
}

function Campaigns() {
  const campains = useGetCampaigns_summaryQuery()

  // ** State
  const [open, setOpen] = useState(false)

  let campainsData = !campains.isLoading ? campains.data?.campaigns : []
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [userData, setUserData] = useState(initialUserData)

  const updateUserDataHandler = useCallback(
    type => event => {
      setUserData({ ...userData, [type]: event.target.value })
    },
    [userData]
  )

  const formHandler = useCallback(
    () => event => {
      event.preventDefault()
      console.log(userData)
    },
    [userData]
  )

  const Refetch = () => {
    campains.refetch()
  }

  return (
    <>
      <Typography variant='h3' sx={{ my: 8 }}>
        Recent Campaigns
      </Typography>
      <hr />
      <Button variant='contained' onClick={handleOpen} sx={{ my: 4 }} startIcon={<AddCircleIcon fontSize='large' />}>
        New Campaign
      </Button>
      <Card sx={{ my: 4, p: 6 }}>
        <DashboardTable rows={campainsData} isLoading={campains.isLoading} Refetch={Refetch} />
      </Card>

      <DialogCreateCampains show={open} handleClose={handleClose} />
    </>
  )
}

Campaigns.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default Campaigns
