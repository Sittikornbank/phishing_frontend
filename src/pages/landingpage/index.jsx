import React, { useState, useCallback } from 'react'

// Components import
import LandingpageTable from 'src/views/table/LandingpageTable'

// MUI Import
import Typography from '@mui/material/Typography'
import { Card, CardHeader, CardContent } from '@mui/material'
import Button from '@mui/material/Button'

// ** Icon Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DialogAdd from 'src/views/landingpage/DialogAdd'
import { useGetLandingPageQuery } from 'src/store/api'

const initialUserData = {
  groupName: '',
  Firstname: '',
  Lastname: '',
  email: ''
}

function Campaigns() {
  // ** Handle Create Dialog
  const landingpage = useGetLandingPageQuery()
  const [createDialog, setCreateDialog] = useState(false)
  const handleCreateOpen = () => setCreateDialog(true)
  const handleCreateClose = () => setCreateDialog(false)

  return (
    <>
      <Typography variant='h3' sx={{ my: 8 }}>
        Landing Page
      </Typography>
      <hr />
      <Button
        variant='contained'
        sx={{ my: 4 }}
        onClick={handleCreateOpen}
        startIcon={<AddCircleIcon fontSize='large' />}
      >
        New Page
      </Button>
      <Card sx={{ my: 4, p: 6 }}>
        <LandingpageTable landingpage={landingpage} />
      </Card>
      <DialogAdd handleClose={handleCreateClose} open={createDialog} refrech={() => landingpage.refetch()} />
    </>
  )
}

Campaigns.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default Campaigns
