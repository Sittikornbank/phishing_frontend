import React, { useState, useCallback } from 'react'

// Components import
import CampaignsTable from 'src/views/table/CampaignsTable'

// MUI Import
import Typography from '@mui/material/Typography'
import { Card, CardHeader, CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'

// ** Icon Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'

const initialUserData = {
  groupName: '',
  Firstname: '',
  Lastname: '',
  email: ''
}

function User_group() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const modal_style = {
    sx: {
      width: '100%'
    },
    position: 'absolute',
    overflowY: 'scroll',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 6
  }

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
        User & Group
      </Typography>
      <hr />
      <Button variant='contained' onClick={handleOpen} sx={{ my: 4 }} startIcon={<AddCircleIcon fontSize='large' />}>
        New Group
      </Button>
      <Card sx={{ my: 4, p: 6 }}>
        <CampaignsTable />
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modal_style}>
          <Typography id='modal-modal-title' variant='h5' component='h2' sx={{ mb: 4 }}>
            New Group
          </Typography>
          <form onSubmit={formHandler()}>
            <Grid container spacing={4} alignItems={'center'} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Typography variant='subtitle1' component='p'>
                  Name:
                </Typography>
                <TextField
                  fullWidth
                  placeholder='Group Name'
                  value={userData.groupName}
                  onChange={updateUserDataHandler('groupName')}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant='contained' sx={{ mr: 4 }} startIcon={<Icon icon='material-symbols:add' />}>
                  Book Import Use
                </Button>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={4} alignItems={'center'}>
              <Grid item xs={6}>
                <Typography variant='subtitle1' component='p'>
                  Firstname:
                </Typography>
                <TextField fullWidth value={userData.Firstname} onChange={updateUserDataHandler('Firstname')} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' component='p'>
                  Lastname:
                </Typography>
                <TextField fullWidth value={userData.Lastname} onChange={updateUserDataHandler('Lastname')} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' component='p'>
                  Email:
                </Typography>
                <TextField fullWidth value={userData.email} onChange={updateUserDataHandler('email')} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' component='p'>
                  Position:
                </Typography>
                <TextField fullWidth value={userData.position} onChange={updateUserDataHandler('position')} />
              </Grid>

              <Grid item xs={12}>
                <Button variant='contained' sx={{ mr: 4 }} startIcon={<Icon icon='material-symbols:add' />}>
                  Add
                </Button>
              </Grid>
              <Grid item xs={12}>
                <CampaignsTable />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant='contained' onClick={handleClose} sx={{ mr: 4 }}>
                  Close
                </Button>
                <Button variant='contained' sx={{ mr: 4 }} startIcon={<Icon icon='material-symbols:save' />}>
                  Create Group
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default User_group
