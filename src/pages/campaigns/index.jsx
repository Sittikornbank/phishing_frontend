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
        <DashboardTable rows={campainsData} isLoading={campains.isLoading} />
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modal_style}>
          <Typography id='modal-modal-title' variant='h5' component='h2' sx={{ mb: 4 }}>
            New Campaign
          </Typography>
          <form onSubmit={formHandler()}>
            <Grid container spacing={4} alignItems={'center'}>
              <Grid item xs={12}>
                <Typography variant='subtitle1' component='p'>
                  Name:
                </Typography>
                <TextField
                  fullWidth
                  placeholder='Campaign Name'
                  value={userData.Name}
                  onChange={updateUserDataHandler('Name')}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1' component='p'>
                  Email Template:
                </Typography>
                <TextField fullWidth value={userData.Email} onChange={updateUserDataHandler('Email')} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1' component='p'>
                  Landing Page:
                </Typography>
                <TextField fullWidth value={userData.Landing_page} onChange={updateUserDataHandler('Landing_page')} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1' component='p'>
                  URL:
                </Typography>
                <TextField fullWidth value={userData.url} onChange={updateUserDataHandler('url')} />
              </Grid>

              <Grid item xs={6}>
                <Typography variant='subtitle1' component='p'>
                  Lunch Date:
                </Typography>
                <TextField fullWidth value={userData.lunch_date} onChange={updateUserDataHandler('lunch_date')} />
              </Grid>

              <Grid item xs={6}>
                <Typography variant='subtitle1' component='p'>
                  Send Email By (obtional):
                </Typography>
                <TextField fullWidth value={userData.send_email_by} onChange={updateUserDataHandler('send_email_by')} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1' component='p'>
                  Sending Profile:
                </Typography>
                <TextField
                  fullWidth
                  value={userData.sending_profile}
                  onChange={updateUserDataHandler('sending_profile')}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='subtitle1' component='p'>
                  Group:
                </Typography>
                <TextField fullWidth value={userData.group} onChange={updateUserDataHandler('group')} />
              </Grid>

              <Grid item xs={12} justifyItems={'center'} alignItems={'center'}>
                <Button variant='contained' onClick={handleClose} sx={{ mr: 4 }}>
                  Close
                </Button>
                <Button variant='contained' sx={{ mr: 4 }} startIcon={<Icon icon='material-symbols:save' />}>
                  Launch Campaigns
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  )
}

Campaigns.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default Campaigns
